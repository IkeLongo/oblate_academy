/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { X, Printer, ExternalLink } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import MuxPlayer from "@mux/mux-player-react";
import "./resources.css";

export type ModalResource = {
  _id: string;
  title: string;
  kind?: string;
  body?: any[];
  image?: any;
  pdfUrl?: string;
  pdfThumbnail?: any;
  url?: string;
  muxVideo?: {
    asset?: {
      playbackId?: string;
      aspectRatio?: string;
      mp4Support?: string;
      staticRenditions?: Array<{ name: string; ext: string; status: string }>;
    };
  };
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
        <div className="relative flex shrink-0 flex-col gap-3 border-b bg-white px-6 py-4 pr-14 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pr-6">
          <h2 className="text-xl font-bold text-slate-800 truncate">{resource.title}</h2>
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
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
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

          {resource.kind === "video" && resource.muxVideo?.asset?.playbackId && (
            <MuxPlayer
              playbackId={resource.muxVideo.asset.playbackId}
              accentColor={accentColor}
              className="w-full rounded-xl"
              style={{ aspectRatio: resource.muxVideo.asset.aspectRatio ?? "16/9" }}
              metadata={{ video_id: resource._id, video_title: resource.title }}
            />
          )}

          {resource.kind === "video" && !resource.muxVideo?.asset?.playbackId && (
            <p className="text-slate-500">Video is not available.</p>
          )}

          {resource.kind === "link" && resource.url && (
            <div className="flex flex-col items-center gap-5 py-10">
              <p className="text-slate-500 text-sm text-center break-all max-w-sm">
                {resource.url}
              </p>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                <ExternalLink className="h-4 w-4" />
                Visit Link
              </a>
            </div>
          )}

          {resource.kind === "link" && !resource.url && (
            <p className="text-slate-500">No URL provided for this resource.</p>
          )}

          {!resource.kind && (
            <p className="text-slate-500">No preview available for this resource.</p>
          )}
        </div>
      </div>
    </div>
  );
}
