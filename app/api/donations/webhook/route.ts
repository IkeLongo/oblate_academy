import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  findContactByEmailOrPhone,
  createContact,
  addTagsToContact,
  findOpportunity,
  createOpportunity,
  updateOpportunityStage,
  updateOpportunityValue,
  sendEmailToAddress,
} from '@/app/lib/ghl/oblateClient';
import { donorThankYouEmail, DONOR_THANK_YOU_SUBJECT } from '@/app/lib/email/templates/donorThankYou';
import {
  donationInternalNotificationEmail,
  donationInternalNotificationSubject,
} from '@/app/lib/email/templates/donationInternalNotification';

export const runtime = 'nodejs';

// ── Types ─────────────────────────────────────────────────────────────────────

interface DonationPayload {
  contact_id?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  'Message/Prayer Intention'?: string;
  payment?: {
    payment_status?: string;
    total_amount?: number | string;
    currency_code?: string;
    currency_symbol?: string;
    transaction_id?: string;
    form?: { name?: string };
    customer?: { id?: string };
  };
}

export async function POST(request: NextRequest) {
  // ── Secret validation ───────────────────────────────────────────────────────
  const expectedSecret = process.env.GHL_DONATION_WEBHOOK_SECRET?.trim();
  const receivedSecret = request.nextUrl.searchParams.get('secret')?.trim();

  if (!expectedSecret || !receivedSecret || receivedSecret !== expectedSecret) {
    console.warn('[DONATION:webhook] Unauthorized — invalid or missing secret');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // ── Parse payload defensively ───────────────────────────────────────────────
  let payload: DonationPayload;
  try {
    payload = (await request.json()) as DonationPayload;
  } catch {
    console.warn('[DONATION:webhook] Failed to parse JSON body');
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  // ── Payment status gate ───────────────────────────────────────────────────
  const paymentStatus = payload.payment?.payment_status;
  if (paymentStatus !== 'succeeded') {
    console.log(
      `[DONATION:webhook] Skipped — payment_status: "${paymentStatus ?? 'missing'}"`
    );
    return NextResponse.json({
      success: true,
      skipped: true,
      reason: 'payment_not_succeeded',
    });
  }

  // ── Extract fields ────────────────────────────────────────────────────────
  const rawContactId =
    payload.contact_id?.trim() || payload.payment?.customer?.id?.trim() || '';

  const firstName   = payload.first_name?.trim() ?? '';
  const lastName    = payload.last_name?.trim() ?? '';
  const fullName    = payload.full_name?.trim()
    || [firstName, lastName].filter(Boolean).join(' ')
    || 'Unknown';

  const email           = payload.email?.trim() ?? '';
  const phone           = payload.phone?.trim() ?? '';
  const prayerIntention = payload['Message/Prayer Intention']?.trim() ?? '';
  const transactionId   = payload.payment?.transaction_id?.trim() ?? '';
  const source          = payload.payment?.form?.name?.trim() || 'Website Donation Form';

  const rawAmount      = payload.payment?.total_amount;
  const symbol         = payload.payment?.currency_symbol?.trim() ?? '';
  const amount         = rawAmount != null ? `${symbol}${rawAmount}` : '';
  const parsedAmount   = Number(rawAmount);
  const donationAmount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 0;

  const pipelineId   = process.env.GHL_OBLATE_PIPELINE_ID!;
  const donorStageId = process.env.GHL_OBLATE_STAGE_DONOR_ID!;

  console.log(
    `[DONATION:webhook] Processing — tx: ${transactionId || '(none)'} | name: ${fullName} | amount: ${amount || '(none)'}`
  );

  try {
    // ── Find / create contact ───────────────────────────────────────────────
    let contactId = rawContactId;

    if (!contactId) {
      const found = await findContactByEmailOrPhone(email, phone);
      contactId = found
        ? found.id
        : (await createContact({ name: fullName, email, phone })).id;
    }

    console.log(`[DONATION:webhook] contactId: ${contactId}`);

    // ── Tags ───────────────────────────────────────────────────────────────
    try {
      await addTagsToContact(contactId, ['donor', 'website-donor']);
    } catch (tagError) {
      console.error(
        '[DONATION:webhook] Tags failed —',
        tagError instanceof Error ? tagError.message : tagError
      );
    }

    // ── Opportunity logic ──────────────────────────────────────────────────
    let opportunityAction: 'created' | 'advanced' | 'unchanged' = 'unchanged';
    let updatedOpportunityValue = 0;

    const opportunity = await findOpportunity(contactId, pipelineId);

    if (!opportunity) {
      await createOpportunity({
        contactId,
        pipelineId,
        pipelineStageId: donorStageId,
        contactName: fullName,
        monetaryValue: donationAmount,
      });
      updatedOpportunityValue = donationAmount;
      opportunityAction = 'created';
    } else {
      const previousValue = opportunity.monetaryValue ?? 0;
      updatedOpportunityValue = previousValue + donationAmount;

      if (opportunity.stageId !== donorStageId) {
        await updateOpportunityStage(opportunity.id, donorStageId);
        opportunityAction = 'advanced';
      }

      await updateOpportunityValue(opportunity.id, updatedOpportunityValue);

      console.log(
        `[DONATION:webhook] Opportunity value — previous: ${previousValue} | donation: ${donationAmount} | updated: ${updatedOpportunityValue}`
      );
    }

    console.log(`[DONATION:webhook] Opportunity action: ${opportunityAction}`);

    // ── Donor thank-you email ──────────────────────────────────────────────
    // TEMPORARILY DISABLED: donor email is handled by GHL's native receipt email
    // which correctly resolves {{receipt.url}}. Re-enable this block when moving
    // back to backend-sent donor emails.
    const donorEmailSent = false;
    let donorEmailError: string | undefined = undefined;
    const donorEmailSkippedReason = 'temporarily_disabled_using_ghl_receipt_email';
    console.log('[DONATION:webhook] donor thank-you email temporarily disabled in favor of GHL receipt email');

    /* --- disabled donor email block ---
    if (email) {
      console.log(`[DONATION:webhook] Donor email — attempting: ${email}`);
      try {
        await sendEmailToAddress(
          email,
          DONOR_THANK_YOU_SUBJECT,
          donorThankYouEmail({
            name: fullName,
            amount: amount || undefined,
            prayerIntention: prayerIntention || undefined,
            receiptUrl: '{{receipt.url}}',
          }),
        );
        // donorEmailSent = true;
        console.log('[DONATION:webhook] Donor email — sent successfully');
      } catch (emailError) {
        // donorEmailError = emailError instanceof Error ? emailError.message : String(emailError);
        console.error('[DONATION:webhook] Donor email — failed:', emailError instanceof Error ? emailError.message : emailError);
      }
    } else {
      // donorEmailSkippedReason = 'no_email_address';
      console.log('[DONATION:webhook] Donor email — skipped: no email address in payload');
    }
    --- end disabled block --- */

    // ── Internal notification emails ────────────────────────────────────────
    let internalEmailSent = false;

    const internalEmails = (process.env.INTERNAL_NOTIFICATION_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean);

    for (const recipient of internalEmails) {
      try {
        await sendEmailToAddress(
          recipient,
          donationInternalNotificationSubject(fullName),
          donationInternalNotificationEmail({
            name: fullName,
            email: email || undefined,
            phone: phone || undefined,
            amount: amount || undefined,
            transactionId: transactionId || undefined,
            prayerIntention: prayerIntention || undefined,
            source,
          })
        );
        internalEmailSent = true;
      } catch (internalEmailError) {
        console.error(
          `[DONATION:webhook] Internal email to ${recipient} failed —`,
          internalEmailError instanceof Error ? internalEmailError.message : internalEmailError
        );
      }
    }

    console.log(`[DONATION:webhook] Complete — contactId: ${contactId} | opportunity: ${opportunityAction} | donorEmailSent: ${donorEmailSent} | internalEmailSent: ${internalEmailSent}`);

    return NextResponse.json({
      success: true,
      processed: true,
      contactId,
      opportunityAction,
      opportunityValueUpdated: true,
      updatedOpportunityValue,
      donorEmailSent,
      ...(donorEmailError        ? { donorEmailError }        : {}),
      ...(donorEmailSkippedReason ? { donorEmailSkippedReason } : {}),
      internalEmailSent,
    });

  } catch (error) {
    console.error(
      '[DONATION:webhook] Fatal error —',
      error instanceof Error ? error.message : error
    );
    return NextResponse.json({ message: 'Failed to process donation.' }, { status: 500 });
  }
}
