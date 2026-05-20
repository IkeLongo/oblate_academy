import { emailLayout } from "./emailLayout";

export function contactInternalNotificationSubject(name: string): string {
  return `New Contact Form Submission — ${name}`;
}

export function contactInternalNotificationEmail(params: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  const { name, email, phone, message } = params;

  const content = `
    <p style="margin: 0 0 20px 0;"><strong>New contact form submission received.</strong></p>
    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 90px; vertical-align: top; color: #555555;">Name</td>
        <td style="padding: 8px 0;">${name}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Email</td>
        <td style="padding: 8px 0;">${email}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Phone</td>
        <td style="padding: 8px 0;">${phone || '—'}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Message</td>
        <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
      </tr>
      <tr style="border-top: 1px solid #eeeeee;">
        <td style="padding: 8px 0; font-weight: bold; vertical-align: top; color: #555555;">Source</td>
        <td style="padding: 8px 0;">Website Contact Form</td>
      </tr>
    </table>
  `;

  return emailLayout({
    title: contactInternalNotificationSubject(name),
    content,
    useInternalFooter: true,
    internalFooterMessage:
      "You are receiving this email because someone submitted a contact form on the Oblate Academy website.",
  });
}
