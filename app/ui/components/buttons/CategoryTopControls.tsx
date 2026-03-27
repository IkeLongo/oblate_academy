/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { FiPrinter } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";

type ResourceKind = "image" | "pdf" | "link" | "video" | "richText";

type ResourceControlsProps = {
  grade: string;
  slug: string;
  basePath: "saints" | "virtues";
  resource: {
    kind: ResourceKind;
    pdfUrl?: string;
    url?: string; // link/video
    imageUrl?: string; // precomputed urlFor(image).url()
    title?: string;
  };
};

export function CategoryTopControls({
  grade,
  slug,
  basePath,
  resource,
}: ResourceControlsProps) {
  const openUrl =
    resource.kind === "pdf"
      ? resource.pdfUrl
      : resource.kind === "image"
        ? resource.imageUrl
        : resource.kind === "link" || resource.kind === "video"
          ? resource.url
          : `/print/${basePath}/${grade}/${slug}`; // fallback for richText if you want

  const canOpen =
    (resource.kind === "pdf" && !!resource.pdfUrl) ||
    (resource.kind === "image" && !!resource.imageUrl) ||
    ((resource.kind === "link" || resource.kind === "video") && !!resource.url) ||
    resource.kind === "richText";

  const canPrint = resource.kind === "pdf" || resource.kind === "image" || resource.kind === "richText";

  const printLabel =
    resource.kind === "image" ? "Print Image" : resource.kind === "richText" ? "Print" : "Print PDF";

  const openLabel =
    resource.kind === "pdf"
      ? "Open PDF"
      : resource.kind === "image"
        ? "Open Image"
        : resource.kind === "video"
          ? "Open Video"
          : resource.kind === "link"
            ? "Open Link"
            : "Open";

  const handlePrint = async () => {
    if (!canPrint) return;

    // PDF: keep your current proxy print
    if (resource.kind === "pdf" && resource.pdfUrl) {
      const proxied = `/api/pdf?url=${encodeURIComponent(resource.pdfUrl)}`;

      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
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

        setTimeout(() => {
          if (document.body.contains(iframe)) iframe.remove();
        }, 60_000);
      };

      document.body.appendChild(iframe);
      return;
    }

    // IMAGE: use iframe approach for reliable printing
    if (resource.kind === "image" && resource.imageUrl) {
      const title = resource.title ?? "Image";
      
      // Create a hidden iframe with the printable content
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      
      document.body.appendChild(iframe);
      
      const doc = iframe.contentWindow?.document;
      if (!doc) return;
      
      doc.open();
      doc.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              @page { margin: 12mm; }
              body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; }
              img { max-width: 100%; height: auto; display: block; }
            </style>
          </head>
          <body>
            <img src="${resource.imageUrl}" alt="${title}" />
          </body>
        </html>
      `);
      doc.close();
      
      // Wait for image to load, then print
      const img = doc.querySelector("img");
      if (img) {
        img.onload = () => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          
          // Clean up after print or timeout
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              iframe.remove();
            }
          }, 1000);
        };
        
        // If image is already cached/loaded
        if (img.complete) {
          img.onload(null as any);
        }
      }
      
      return;
    }

    // RICH TEXT: print a dedicated route that renders clean HTML (recommended)
    // This avoids trying to print from Sanity JSON in the client.
    if (resource.kind === "richText") {
      // You can point this to your existing page route if it renders rich text,
      // or create /grade/[grade]/.../print route.
      window.open(`${window.location.pathname}?print=1`, "_blank", "noopener,noreferrer");
      return;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/grade/${grade}/${basePath}/${slug}`}
        className="inline-flex text-blue-400 h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/80 transition"
        aria-label="Back"
      >
        ←
      </Link>

      <div className="flex gap-2 ml-auto">
        {/* PRINT (only when it makes sense) */}
        {canPrint && (
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/80 transition"
            aria-label={printLabel}
            title={printLabel}
          >
            <FiPrinter className="w-6 h-6 text-blue-400" />
          </button>
        )}

        {/* OPEN (only when it makes sense) */}
        {canOpen && openUrl && (
          <Link
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/80 transition"
            aria-label={openLabel}
            title={openLabel}
          >
            {resource.kind === "pdf" ? (
              <img src="/pdf.svg" alt="PDF" className="w-6 h-6" />
            ) : resource.kind === "richText" ? (
              <FiFileText className="w-6 h-6 text-blue-400" />
            ) : (
              <FiExternalLink className="w-6 h-6 text-blue-400" />
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
