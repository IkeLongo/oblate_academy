import { emailHeader } from "./header";
import { emailFooter } from "./footer";
import { internalFooter } from "./internalFooter";

export interface EmailLayoutOptions {
  title: string;
  content: string;
  websiteUrl?: string;
  showTaxNotice?: boolean;
  useInternalFooter?: boolean;
  internalFooterMessage?: string;
}

export function emailLayout({ title, content, websiteUrl, showTaxNotice, useInternalFooter, internalFooterMessage }: EmailLayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: Arial, sans-serif;
  ">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation" style="background-color: #f4f4f4;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            role="presentation"
            style="
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 5px;
              overflow: hidden;
              border: 1px solid #e4e4e4;
            "
          >
            <tr>
              <td>${emailHeader()}</td>
            </tr>
            <tr>
              <td style="
                padding: 28px 48px;
                color: #333333;
                font-family: Arial, sans-serif;
                font-size: 15px;
                line-height: 1.6;
                background-color: #ffffff;
              ">
                ${content}
              </td>
            </tr>
            <tr>
              <td>${useInternalFooter ? internalFooter(internalFooterMessage) : emailFooter({ websiteUrl, showTaxNotice })}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
