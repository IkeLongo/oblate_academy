const DEFAULT_MESSAGE =
  "You are receiving this email because of activity on the Oblate Academy website.";

export function internalFooter(message?: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff8cd; border-collapse: collapse;">
      <tr>
        <td style="padding: 16px 32px; text-align: center;">
          <div style="border-top: 1px solid #e0d89a; margin-bottom: 12px;"></div>
          <p style="
            margin: 0;
            font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
            font-size: 12px;
            color: #888888;
            line-height: 1.5;
          ">${message ?? DEFAULT_MESSAGE}</p>
        </td>
      </tr>
    </table>
  `;
}
