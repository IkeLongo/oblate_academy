import { NextResponse } from "next/server";
import type { NewsletterApiResponse, NewsletterSubmitPayload } from "@/app/types";

export const runtime = "nodejs";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Minimum ms between modal open and form submit. Headless scripts fire in < 1 s. */
const MIN_ELAPSED_MS = 3_000;

/** Maximum ms a payload timestamp is considered fresh (1 hour). */
const MAX_ELAPSED_MS = 3_600_000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of the JSON body forwarded to the GHL webhook. */
interface GhlNewsletterPayload {
  name: string;
  email: string;
  phone: string;
  optIn: boolean;
  source: string;
  submittedAt: string; // ISO 8601
  tags: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function digits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Returns a validated payload or a string describing the first problem. */
function parsePayload(
  body: unknown
): NewsletterSubmitPayload | string {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "Invalid request body.";
  }

  const b = body as Record<string, unknown>;

  // Required shape checks — treat missing keys as empty rather than crashing.
  const email    = typeof b.email    === "string" ? b.email.trim()    : "";
  const fullName = typeof b.fullName === "string" ? b.fullName.trim() : "";
  const phone    = typeof b.phone    === "string" ? b.phone.trim()    : "";
  const optIn    = b.optIn === true;
  const _hp      = typeof b._hp     === "string" ? b._hp             : null;
  const _ts      = typeof b._ts     === "number" ? b._ts             : null;

  // Anti-spam fields must be present with the right types.
  if (_hp === null) return "Invalid request.";
  if (_ts === null) return "Invalid request.";

  // Field validation.
  if (!EMAIL_RE.test(email))          return "Please enter a valid email address.";
  if (fullName.length < 2)            return "Please enter your full name.";
  if (digits(phone).length !== 10)    return "Please enter a valid 10-digit phone number.";
  if (!optIn)                         return "Opt-in confirmation is required.";

  return { email, fullName, phone, optIn, _hp, _ts };
}

/** Discriminated result from spam checks. */
type SpamCheckResult =
  | { verdict: "ok" }
  | { verdict: "honeypot" }
  | { verdict: "reject"; reason: string };

/**
 * Inspects anti-spam fields and returns a verdict.
 * "honeypot" is kept distinct so the caller can fake-succeed silently.
 */
function spamReason(payload: NewsletterSubmitPayload): SpamCheckResult {
  if (payload._hp !== "") return { verdict: "honeypot" };

  const elapsed = Date.now() - payload._ts;

  if (elapsed < 0) {
    // Client clock is ahead of the server — treat as suspicious.
    return { verdict: "reject", reason: "Invalid submission timestamp. Please try again." };
  }
  if (elapsed < MIN_ELAPSED_MS) {
    return { verdict: "reject", reason: `Submission too fast (${elapsed}\u202fms). Please try again.` };
  }
  if (elapsed > MAX_ELAPSED_MS) {
    return { verdict: "reject", reason: "This form session has expired. Please reload the page and try again." };
  }

  return { verdict: "ok" };
}

/**
 * Forwards clean signup data to the GHL webhook.
 * Never throws — returns an object describing success or failure.
 */
async function sendToGhl(
  data: Omit<NewsletterSubmitPayload, "_hp" | "_ts">
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL_NEWSLETTER;

  if (!webhookUrl) {
    console.error("[newsletter-signup] GHL_WEBHOOK_URL_NEWSLETTER is not set.");
    return { ok: false, reason: "Webhook URL not configured." };
  }

  const ghlPayload: GhlNewsletterPayload = {
    name:        data.fullName,
    email:       data.email,
    phone:       data.phone,
    optIn:       data.optIn,
    source:      "Website Newsletter Signup",
    submittedAt: new Date().toISOString(),
    tags:        ["newsletter", "website"],
  };

  try {
    const res = await fetch(webhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(ghlPayload),
      cache:   "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "(unreadable)");
      console.error(`[newsletter-signup] GHL webhook responded ${res.status}: ${text}`);
      return { ok: false, reason: `Webhook responded with status ${res.status}.` };
    }

    return { ok: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown network error.";
    console.error("[newsletter-signup] GHL webhook fetch failed:", message);
    return { ok: false, reason: message };
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: Request): Promise<NextResponse<NewsletterApiResponse>> {
  // 1. Parse JSON body safely.
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 2. Validate shape and field values.
  const parsed = parsePayload(rawBody);
  if (typeof parsed === "string") {
    return NextResponse.json(
      { success: false, message: parsed },
      { status: 422 }
    );
  }

  // 3. Anti-spam checks.
  const spam = spamReason(parsed);
  if (spam.verdict === "honeypot") {
    // Silent fake success — bots get no feedback that they were rejected.
    console.warn("[newsletter-signup] Honeypot triggered.");
    return NextResponse.json({ success: true, message: "You're signed up!" });
  }
  if (spam.verdict === "reject") {
    return NextResponse.json(
      { success: false, message: spam.reason },
      { status: 422 }
    );
  }

  // 4. Clean payload — strip anti-spam fields before forwarding.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _hp: _honeypot, _ts: _timestamp, ...cleanData } = parsed;

  console.log("[newsletter-signup] Forwarding to GHL:", {
    email: cleanData.email,
    fullName: cleanData.fullName,
    phone: cleanData.phone,
    webhookConfigured: !!process.env.GHL_WEBHOOK_URL_NEWSLETTER,
  });

  // 5. Send to GHL webhook.
  const ghl = await sendToGhl(cleanData);

  if (!ghl.ok) {
    console.error("[newsletter-signup] GHL send failed:", ghl.reason);
    return NextResponse.json(
      { success: false, message: "We couldn't complete your signup. Please try again shortly." },
      { status: 502 }
    );
  }

  console.log("[newsletter-signup] GHL webhook accepted the submission.");
  return NextResponse.json({ success: true, message: "You're signed up!" });
}

// Reject non-POST methods explicitly.
export async function GET(): Promise<NextResponse<NewsletterApiResponse>> {
  return NextResponse.json(
    { success: false, message: "Method not allowed." },
    { status: 405 }
  );
}
