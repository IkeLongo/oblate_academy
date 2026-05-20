import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { findContactByEmailOrPhone, createContact, findOpportunity, createOpportunity, sendContactEmail, sendEmailToAddress, addTagsToContact } from '@/app/lib/ghl/oblateClient';
import { contactConfirmationEmail, CONTACT_CONFIRMATION_SUBJECT } from '@/app/lib/email/templates/contactConfirmation';
import { contactInternalNotificationEmail, contactInternalNotificationSubject } from '@/app/lib/email/templates/contactInternalNotification';

export const runtime = "nodejs";

// ── In-memory rate limiter ────────────────────────────────────────────────────
// Resets on cold start in serverless — effective for burst spam within the same
// instance. For persistent cross-instance limiting, swap for Upstash Redis.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 3;                     // max 3 submissions per IP per window

const rateLimitStore = new Map<string, { count: number; since: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  // Prune stale entries to prevent unbounded memory growth
  if (rateLimitStore.size > 500) {
    for (const [key, entry] of rateLimitStore) {
      if (now - entry.since > RATE_WINDOW_MS) rateLimitStore.delete(key);
    }
  }
  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.since > RATE_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, since: now });
    return true;
  }
  if (entry.count >= RATE_MAX) return false;
  entry.count++;
  return true;
}

// ── Validation + spam detection ───────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SPAM_KEYWORDS =
  /\b(casino|poker|slots|viagra|cialis|pharmacy|lottery|winner|prize|cryptocurrency|bitcoin|nft\b|forex|loan offer|debt relief|payday loan|make money fast|work from home|binary option|seo service|backlink|adult content)\b/i;

function countUrls(text: string): number {
  return (text.match(/https?:\/\//gi) ?? []).length;
}

function isSpam(text: string): boolean {
  if (countUrls(text) > 2) return true;
  if (SPAM_KEYWORDS.test(text)) return true;
  return false;
}

// Fake success so bots think the submission worked
const fakeSuccess = () =>
  NextResponse.json({ message: 'Contact received and confirmation email sent.' });

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip)) {
    console.warn(`[SPAM] Rate limited — IP: ${ip}`);
    return NextResponse.json(
      { message: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  const { name, email, phone, message, status, tags, _hp, _lt } =
    body as Record<string, unknown>;

  // Honeypot check — bots fill this, real users never see it
  if (typeof _hp === 'string' && _hp.trim().length > 0) {
    console.warn(`[SPAM] Honeypot triggered — IP: ${ip}`);
    return fakeSuccess();
  }

  // Timing check — submissions under 3 s are almost certainly bots
  const loadTime = Number(_lt);
  if (!isNaN(loadTime) && loadTime > 0 && Date.now() - loadTime < 3000) {
    console.warn(`[SPAM] Submission too fast (${Date.now() - loadTime}ms) — IP: ${ip}`);
    return fakeSuccess();
  }

  // Required field + format validation
  const cleanName    = String(name    ?? '').trim();
  const cleanEmail   = String(email   ?? '').trim().toLowerCase();
  const cleanPhone   = String(phone   ?? '').trim();
  const cleanMessage = String(message ?? '').trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return NextResponse.json(
      { message: 'Please fill in all required fields.' },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json(
      { message: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  // Spam keyword / URL check
  if (isSpam(cleanMessage) || isSpam(cleanName)) {
    console.warn(
      `[SPAM] Keyword/URL match — IP: ${ip} | name: "${cleanName}" | message: "${cleanMessage.slice(0, 100)}"`
    );
    return fakeSuccess();
  }

  // Validate required fields
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ message: "Invalid name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Invalid email." }, { status: 400 });
  }
  if (typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ message: "Invalid phone." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ message: "Invalid message." }, { status: 400 });
  }

  // Replace webhook logic with GHL API calls
  try {
    const contact = await findContactByEmailOrPhone(email, phone);
    const contactId = contact ? contact.id : (await createContact({ name, email, phone })).id;

    // Apply tags to the contact
    const cleanTags = Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0) : [];
    console.log('[TAGS] received tags:', JSON.stringify(cleanTags));
    if (cleanTags.length > 0) {
      try {
        await addTagsToContact(contactId, cleanTags);
      } catch (tagError) {
        console.error('[TAGS] failed —', tagError instanceof Error ? tagError.message : tagError);
      }
    } else {
      console.log('[TAGS] no tags to apply — skipping');
    }

    const opportunity = await findOpportunity(contactId, process.env.GHL_OBLATE_PIPELINE_ID!);
    if (!opportunity) {
      await createOpportunity({
        contactId,
        pipelineId: process.env.GHL_OBLATE_PIPELINE_ID!,
        pipelineStageId: process.env.GHL_OBLATE_STAGE_NEW_INQUIRY_ID!,
        contactName: cleanName,
      });
    }

    // Best-effort confirmation email — failure must not block the response
    try {
      await sendContactEmail({
        contactId,
        toEmail: cleanEmail,
        subject: CONTACT_CONFIRMATION_SUBJECT,
        html: contactConfirmationEmail(cleanName),
      });
    } catch (emailError) {
      // [DEBUG]
      if (emailError instanceof Error) {
        console.error('[EMAIL] Confirmation email failed:', emailError.message);
        if ('status' in emailError) console.error('[EMAIL] GHL status:', (emailError as { status: number }).status);
        if ('details' in emailError) console.error('[EMAIL] GHL details:', (emailError as { details: string }).details);
      } else {
        console.error('[EMAIL] Confirmation email failed (unknown error):', emailError);
      }
    }

    // Best-effort internal notification emails
    const internalEmails = (process.env.INTERNAL_NOTIFICATION_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    for (const recipient of internalEmails) {
      try {
        console.log(`[EMAIL:internal] sending to ${recipient}`);
        await sendEmailToAddress(
          recipient,
          contactInternalNotificationSubject(cleanName),
          contactInternalNotificationEmail({
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            message: cleanMessage,
          }),
        );
        console.log(`[EMAIL:internal] success`);
      } catch (internalEmailError) {
        console.error(
          `[EMAIL:internal] failed`,
          internalEmailError instanceof Error ? internalEmailError.message : internalEmailError,
        );
      }
    }

    return NextResponse.json({ message: "Contact received and processed successfully." });
  } catch (error) {
    console.error("GHL API Error:", error);
    return NextResponse.json({ message: "Failed to process contact." }, { status: 500 });
  }
}