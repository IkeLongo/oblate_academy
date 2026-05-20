import { emailLayout } from "./emailLayout";

export function donationInternalNotificationSubject(name: string): string {
  return `New Donation Received — ${name}`;
}

export function donationInternalNotificationEmail(params: {
  name: string;
  email?: string;
  phone?: string;
  amount?: string;
  transactionId?: string;
  prayerIntention?: string;
  source?: string;
}): string {
  const { name, email, phone, amount, transactionId, prayerIntention, source } = params;

  const content = `
    <p style="margin: 0 0 20px 0;"><strong>New donation received.</strong></p>
    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 130px; vertical-align: top; color: #555555;">Name</td>
        <td style="padding: 8px 0;">${name}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Email</td>
        <td style="padding: 8px 0;">${email || '—'}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Phone</td>
        <td style="padding: 8px 0;">${phone || '—'}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Amount</td>
        <td style="padding: 8px 0;">${amount || '—'}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Transaction ID</td>
        <td style="padding: 8px 0;">${transactionId || '—'}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Prayer Intention</td>
        <td style="padding: 8px 0; white-space: pre-wrap;">${prayerIntention || '—'}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Source</td>
        <td style="padding: 8px 0;">${source || 'Website Donation Form'}</td>
      </tr>
    </table>
  `;

  return emailLayout({
    title: donationInternalNotificationSubject(name),
    content,
    useInternalFooter: true,
    internalFooterMessage:
      "You are receiving this email because a donation was submitted on the Oblate Academy website.",
  });
}
