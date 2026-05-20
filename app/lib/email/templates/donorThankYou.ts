import { emailLayout } from "./layout";

export const DONOR_THANK_YOU_SUBJECT = "Thank You for Supporting the Oblate Academy";

export function donorThankYouEmail(params: {
  name: string;
  amount?: string;
  prayerIntention?: string;
  receiptUrl?: string;
}): string {
  const { name, amount, prayerIntention, receiptUrl } = params;

  const amountLine = amount
    ? `<p style="margin: 0 0 16px 0;">
        We are grateful to have received your donation of <strong>${amount}</strong>, which will
        directly support our mission of helping children grow in faith, virtue, and joy through
        engaging Catholic education.
      </p>`
    : `<p style="margin: 0 0 16px 0;">
        Your donation will directly support our mission of helping children grow in faith, virtue,
        and joy through engaging Catholic education.
      </p>`;

  const prayerLine = prayerIntention
    ? `<p style="margin: 0 0 16px 0;">
        We have also received your prayer intention and will keep it close in our prayers.
        May Our Lord bless you abundantly and continue to guide you and your family.
      </p>`
    : "";

  const content = `
    <p style="margin: 0 0 16px 0;">Dear ${name},</p>
    <p style="margin: 0 0 16px 0;">
      Thank you for your support of Oblate Academy. Your gift is more than a donation — it is an
      investment in the faith, formation, and future of the children and families we serve.
    </p>
    ${amountLine}
    ${prayerLine}
    <p style="margin: 0 0 16px 0;">
      Thank you for partnering with us in this mission. Your generosity truly makes a difference.
    </p>
    ${receiptUrl ? `
    <p style="margin: 0 0 24px 0; text-align: center;">
      <a
        href="${receiptUrl}"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display: inline-block;
          background-color: #0B4F6C;
          color: #ffffff;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 24px;
          border-radius: 8px;
          font-family: Arial, sans-serif;
        "
      >View Receipt</a>
    </p>` : ""}
    <p style="margin: 0;">
      With gratitude,<br />
      <strong>The Oblate Academy Team</strong>
    </p>
  `;

  return emailLayout({
    title: DONOR_THANK_YOU_SUBJECT,
    content,
    websiteUrl: "https://oblateacademy.com",
    showTaxNotice: true,
  });
}
