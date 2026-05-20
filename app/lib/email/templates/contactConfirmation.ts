import { emailLayout } from "./layout";

export const CONTACT_CONFIRMATION_SUBJECT = "Thank you for contacting Oblate Academy";

export function contactConfirmationEmail(name: string): string {
  const content = `
    <p style="margin: 0 0 16px 0;">Dear ${name},</p>
    <p style="margin: 0 0 16px 0;">
      Thank you for reaching out to Oblate Academy! We have received your message
      and will follow up with you if needed.
    </p>
    <p style="margin: 0 0 16px 0;">
      God bless you and your family.
    </p>
    <p style="margin: 0;">
      In Christ,<br />
      <strong>The Oblate Academy Team</strong>
    </p>
  `;

  return emailLayout({
    title: CONTACT_CONFIRMATION_SUBJECT,
    content,
    websiteUrl: "https://oblateacademy.com",
  });
}
