"use client";

import React from "react";

type PrintButtonProps = {
  /** Pass for PDF resources — proxies via /api/pdf and prints via hidden iframe */
  pdfUrl?: string;
  /** Pass for image resources — opens a clean print window */
  imageUrl?: string;
  /** Title shown in the print window. For richText falls back to DOM print-section or window.print(). */
  title?: string;
  /** aria-label and title tooltip for the button element */
  ariaLabel?: string;
  /** Override button className. Defaults to the original blue pill style. */
  className?: string;
  /** Custom button content. Defaults to the text "Print". */
  children?: React.ReactNode;
};

export default function PrintButton({
  pdfUrl,
  imageUrl,
  title = "Print",
  ariaLabel,
  className = "mt-8 print:hidden px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
  children,
}: PrintButtonProps) {
  const handlePrint = () => {
    // PDF: hidden iframe + /api/pdf proxy (reliable cross-origin printing)
    if (pdfUrl) {
      const proxied = `/api/pdf?url=${encodeURIComponent(pdfUrl)}`;
      const iframe = document.createElement("iframe");
      iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
      iframe.src = proxied;
      iframe.onload = () => {
        const w = iframe.contentWindow;
        if (!w) return;
        const cleanup = () => {
          w.removeEventListener("afterprint", cleanup);
          iframe.remove();
        };
        w.addEventListener("afterprint", cleanup);
        w.focus();
        w.print();
        setTimeout(() => { if (document.body.contains(iframe)) iframe.remove(); }, 60_000);
      };
      document.body.appendChild(iframe);
      return;
    }

    // Image: clean print window
    if (imageUrl) {
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>@page{margin:12mm}body{margin:0;padding:0;display:flex;justify-content:center;align-items:center}img{max-width:100%;height:auto;display:block}</style>
          </head>
          <body>
            <img src="${imageUrl}" alt="${title}" onload="window.print();window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
      return;
    }

    // RichText / DOM: find print-section or fall back to window.print()
    const printSection = document.getElementById("print-section");
    if (printSection) {
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
            <style>
              body { background: white; margin: 0; padding: 2rem; font-family: 'Poppins', Arial, sans-serif; font-size: 1.25rem; line-height: 2; }
              .prose { max-width: none; }
              h1 { font-size: 2.2rem; color: #60a5fa; font-family: 'Fredoka', Arial, sans-serif; font-weight: 600; }
              .prose p { font-size: 1.35rem; line-height: 2.2; font-family: 'Poppins', Arial, sans-serif; }
            </style>
          </head>
          <body>${printSection.innerHTML}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      return;
    }

    // Last resort: print current page as-is
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={className}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {children ?? "Print"}
    </button>
  );
}