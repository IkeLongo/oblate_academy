/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import { Download, ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { ResourceModal, type ModalResource } from "./ResourceModal";
import { ResourceHoverCard } from "./ResourceHoverCard";

type Props = {
  resources: ModalResource[];
  accentColor?: string;
};

export function ResourcesGrid({ resources, accentColor = "#168647" }: Props) {
  const [selected, setSelected] = useState<ModalResource | null>(null);
  const [hoveredDownload, setHoveredDownload] = useState<string | null>(null);

  function printResource(resource: ModalResource) {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>${resource.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;700&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { background: white; margin: 0; padding: 2rem; font-family: 'Poppins', Arial, sans-serif; }
            h1 { font-size: 2.2rem; font-family: 'Fredoka', Arial, sans-serif; font-weight: 600; }
            p { font-size: 1.25rem; line-height: 2.1; }
          </style>
        </head>
        <body onload="window.print();window.close();">
          <h1>${resource.title}</h1>
          ${(resource.body ?? []).map((block: any) =>
            `<p>${(block.children ?? []).map((c: any) => c.text).join("")}</p>`
          ).join("")}
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  function getDownloadHref(resource: ModalResource): string | null {
    if (resource.kind === "image" && resource.image) return urlFor(resource.image).url();
    if (resource.pdfUrl) return resource.pdfUrl;
    return null;
  }

  async function handleDownload(e: MouseEvent, resource: ModalResource) {
    e.stopPropagation();
    const href = getDownloadHref(resource);
    if (!href) {
      printResource(resource);
      return;
    }
    try {
      const res = await fetch(`/api/pdf?url=${encodeURIComponent(href)}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${resource.title}${resource.kind === "image" ? ".webp" : ".pdf"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(href, "_blank");
    }
  }

  return (
    <>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <ResourceHoverCard key={resource._id} resource={resource}>
            <div
              onClick={() => setSelected(resource)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(resource); }}
              role="button"
              tabIndex={0}
              className="text-left w-full rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition cursor-pointer"
            >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg text-slate-800">
                {resource.title}
              </h3>
              {(getDownloadHref(resource) || resource.kind === "richText") && (
                <button
                  onClick={(e) => handleDownload(e, resource)}
                  onMouseEnter={() => setHoveredDownload(resource._id)}
                  onMouseLeave={() => setHoveredDownload(null)}
                  className="shrink-0 rounded-lg p-1.5 transition"
                  style={{
                    color: accentColor,
                    backgroundColor: hoveredDownload === resource._id ? `${accentColor}14` : "transparent",
                  }}
                  title={resource.kind === "image" ? "Download image" : "Download PDF"}
                  aria-label={`Download ${resource.title}`}
                >
                  <Download className="h-4 w-4" />
                </button>
              )}
              {resource.kind === "link" && resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setHoveredDownload(resource._id)}
                  onMouseLeave={() => setHoveredDownload(null)}
                  className="shrink-0 rounded-lg p-1.5 transition"
                  style={{
                    color: accentColor,
                    backgroundColor: hoveredDownload === resource._id ? `${accentColor}14` : "transparent",
                  }}
                  title="Open link"
                  aria-label={`Open ${resource.title}`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            {resource.kind === "pdf" && (
              <p className="mt-1 text-sm font-medium" style={{ color: accentColor }}>
                PDF available
              </p>
            )}
            {resource.kind === "image" && (
              <p className="mt-1 text-sm text-blue-500 font-medium">
                Image resource
              </p>
            )}
            {resource.kind === "richText" && (
              <p className="mt-1 text-sm text-slate-500 font-medium">
                Reading material
              </p>
            )}
            {resource.kind === "video" && (
              <p className="mt-1 text-sm text-purple-500 font-medium">
                Video
              </p>
            )}
            {resource.kind === "link" && (
              <p className="mt-1 text-sm text-blue-500 font-medium">
                External link
              </p>
            )}
            </div>
          </ResourceHoverCard>
        ))}
      </div>

      <ResourceModal resource={selected} onClose={() => setSelected(null)} accentColor={accentColor} />
    </>
  );
}
