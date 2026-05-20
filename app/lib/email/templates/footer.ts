export interface EmailFooterOptions {
  websiteUrl?: string;
  showTaxNotice?: boolean;
}

export function emailFooter({ websiteUrl, showTaxNotice = false }: EmailFooterOptions = {}): string {
  const websiteLine = websiteUrl
    ? `<a
        href="${websiteUrl}"
        style="
          color: #888888;
          text-decoration: underline;
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-size: 12px;
        "
      >${websiteUrl}</a>`
    : "";

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff8cd; border-collapse:collapse;">

      <!-- LOGO -->
      <tr>
        <td align="center" style="padding:32px 48px 16px 48px;">
          <img
            src="https://assets.cdn.filesafe.space/YpPf2yqih9ailajsMLZt/media/6a024c0bd11dcc8705329911.svg"
            width="220"
            alt="Oblate Academy"
            style="display:block; max-width:220px; width:100%; height:auto; border:0;"
          />
        </td>
      </tr>

      <!-- MISSION LINE -->
      <tr>
        <td align="center" style="padding:0 48px 24px 48px;">
          <p style="margin:0; color:#0f172a; font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size:16px; line-height:1.6; font-style:italic;">
            Helping children grow in faith, virtue and knowledge through engaging Catholic education.
          </p>
        </td>
      </tr>

      <!-- CROSS DIVIDER -->
      <tr>
        <td align="center" style="padding:4px 48px 24px 48px;">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              border-collapse:collapse;
              width:100%;
            "
          >
            <tr>

              <!-- LEFT LINE -->
              <td width="50%" valign="middle">
                <div
                  style="
                    height:2px;
                    background:#d4b200;
                    width:100%;
                  "
                >&nbsp;</div>
              </td>

              <!-- CROSS -->
              <td
                valign="middle"
                align="center"
                style="
                  padding:0 14px;
                  color:#d4b200;
                  font-size:30px;
                  line-height:30px;
                  font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif;
                  white-space:nowrap;
                "
              >
                †
              </td>

              <!-- RIGHT LINE -->
              <td width="50%" valign="middle">
                <div
                  style="
                    height:2px;
                    background:#d4b200;
                    width:100%;
                  "
                >&nbsp;</div>
              </td>

            </tr>
          </table>
        </td>
      </tr>

      <!-- SCRIPTURE -->
      <tr>
        <td align="center" style="padding:0 48px 18px 48px;">
          <p style="margin:0; color:#8fc3dd; font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size:24px; font-style:italic; line-height:1.5;">
            "Let the little children come to me..."
            <span style="white-space:nowrap;">– Matthew 19:14</span>
          </p>
        </td>
      </tr>

      <!-- TAX / RECORDS (donation emails only) -->
      ${showTaxNotice ? `
      <tr>
        <td align="center" style="padding:0 48px 10px 48px;">
          <p style="margin:0; color:#0f172a; font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size:14px; line-height:1.6; font-weight:600;">
            Your contribution may be tax deductible as allowed by law.
          </p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 48px 30px 48px;">
          <p style="margin:0; color:#0f172a; font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size:14px; line-height:1.6;">
            Please retain this email for your records.
          </p>
        </td>
      </tr>` : ``}

      <!-- DIVIDER -->
      <tr>
        <td align="center" style="padding:0 48px 28px 48px;">
          <div style="width:100%; height:2px; background:#9ed0e8; line-height:2px; font-size:0;">&nbsp;</div>
        </td>
      </tr>

      <!-- RECEIVING EMAIL -->
      <tr>
        <td align="center" style="padding:0 48px 20px 48px;">
          <p style="margin:0; color:#0f172a; font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size:14px; line-height:1.7;">
            You are receiving this email because you donated or engaged with the Oblate Academy.
          </p>
        </td>
      </tr>

      <!-- LOCATION -->
      <tr>
        <td align="center" style="padding:0 48px 36px 48px;">
          <p style="margin:0; color:#0f172a; font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size:14px; line-height:1.7;">
            <a href="#" style="color:#8fc3dd; text-decoration:underline;">Unsubscribe</a>
            &nbsp; | &nbsp;
            Oblate Academy, San Antonio, Texas
          </p>
        </td>
      </tr>

      <!-- WEBSITE + SOCIALS -->
      <tr>
        <td align="center" style="padding:0 48px 40px 48px;">

          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>

              <!-- WEBSITE -->
              <td align="center" style="padding-right:18px;">
                <a
                  href="https://www.oblateacademy.org"
                  style="color:#8fc3dd; font-family:'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size:16px; text-decoration:underline;"
                >
                  www.oblateacademy.org
                </a>
              </td>

              <!-- FACEBOOK -->
              <td align="center" style="padding-right:10px;">
                <a href="https://www.facebook.com/profile.php?id=61584416584808" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://assets.cdn.filesafe.space/YpPf2yqih9ailajsMLZt/media/6a0df2be0aac078e7b504179.svg"
                    width="20"
                    height="20"
                    alt="Facebook"
                    style="display:block; border:0;"
                  />
                </a>
              </td>

              <!-- INSTAGRAM -->
              <td align="center" style="padding-right:10px;">
                <a href="https://www.instagram.com/oblateacademy/" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://assets.cdn.filesafe.space/YpPf2yqih9ailajsMLZt/media/6a0df2be07a34aa07f8023b2.svg"
                    width="20"
                    height="20"
                    alt="Instagram"
                    style="display:block; border:0;"
                  />
                </a>
              </td>

            </tr>
          </table>

        </td>
      </tr>

    </table>
  `.trim();
}