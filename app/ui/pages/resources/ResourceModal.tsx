"use client";

import { useEffect, useState } from "react";
import { X, Printer } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import "./resources.css";

export type ModalResource = {
  _id: string;
  title: string;
  kind?: string;
  body?: any[];
  image?: any;
  pdfUrl?: string;
};

type Props = {
  resource: ModalResource | null;
  onClose: () => void;
  accentColor?: string;
};

export function ResourceModal({ resource, onClose, accentColor = "#168647" }: Props) {
  const [printHovered, setPrintHovered] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!resource) return null;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    let body = "";
    if (resource.kind === "richText") {
      const printSection = document.getElementById("modal-print-content");
      body = `<h1>${resource.title}</h1>${printSection?.innerHTML ?? ""}`;
    } else if (resource.kind === "image" && resource.image) {
      const src = urlFor(resource.image).url();
      body = `<img src="${src}" alt="${resource.title}" style="max-width:100%;height:auto;" />`;
    } else if (resource.kind === "pdf" && resource.pdfUrl) {
      body = `<iframe src="${resource.pdfUrl}" style="width:100%;height:90vh;border:none;"></iframe>`;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${resource.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body {
              background: white;
              margin: 0;
              padding: ${resource.kind === "richText" ? "2rem" : "0"};
              font-family: 'Poppins', Arial, sans-serif;
            }
            h1 { font-size: 2.2rem; font-family: 'Fredoka', Arial, sans-serif; font-weight: 600; }
            p { font-size: 1.25rem; line-height: 2.1; }
            @page { margin: ${resource.kind === "richText" ? "1cm" : "0"}; }
          </style>
        </head>
        <body onload="window.print();window.close();">${body}</body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    // Backdrop — click outside to close
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      {/* Modal panel — overflow-hidden preserves rounded corners */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — outside scroll area so it never scrolls away */}
        <div className="flex shrink-0 items-center justify-between border-b bg-white px-6 py-4">
          <h2 className="text-xl font-bold text-slate-800 pr-4">{resource.title}</h2>
          <div className="flex items-center gap-2 shrink-0">
            {(resource.kind === "richText" || resource.kind === "image" || resource.kind === "pdf") && (
              <button
                onClick={handlePrint}
                onMouseEnter={() => setPrintHovered(true)}
                onMouseLeave={() => setPrintHovered(false)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition"
                style={{
                  color: accentColor,
                  backgroundColor: printHovered ? `${accentColor}14` : "transparent",
                }}
                aria-label="Print / Save as PDF"
              >
                <Printer className="h-4 w-4" />
                <span>Print / PDF</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body — scrollable with custom scrollbar */}
        <div className="modal-scroll overflow-y-auto p-6">
          {resource.kind === "image" && resource.image?.asset && (
            <img
              src={urlFor(resource.image).url()}
              alt={resource.title}
              className="w-full h-auto rounded-xl"
            />
          )}

          {resource.kind === "pdf" && resource.pdfUrl && (
            <iframe
              src={resource.pdfUrl}
              title={resource.title}
              className="w-full h-[70vh] rounded-xl border-0"
            />
          )}

          {resource.kind === "richText" && resource.body && (
            <div id="modal-print-content" className="prose max-w-none" style={{ fontSize: "1.25rem", lineHeight: "1.9" }}>
              <PortableText value={resource.body} />
            </div>
          )}

          {!resource.kind && (
            <p className="text-slate-500">No preview available for this resource.</p>
          )}
        </div>
      </div>
    </div>
  );
}
