// TODO: Align header background with exact website brand navy once finalized
const HEADER_BG = "#1e3a5f";

export function emailHeader(): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#064f63; border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:36px 24px 12px 24px;">
          <img
            src="https://assets.cdn.filesafe.space/YpPf2yqih9ailajsMLZt/media/6a03aa8a51bf95bcbb727c8c.svg"
            alt="Oblate Academy"
            width="300"
            style="display:block; width:100%; max-width:300px; height:auto; border:0;"
          />
        </td>
      </tr>

      <tr>
        <td style="height:12px; background:#ffd900; line-height:12px; font-size:0;">&nbsp;</td>
      </tr>
    </table>
  `.trim();
}
