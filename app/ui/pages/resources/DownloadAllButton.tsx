"use client";

import { useState } from "react";
import JSZip from "jszip";
import { Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { urlFor } from "@/sanity/lib/image";
import { ImagesBadge } from "@/app/ui/components/previews/images-badge";

type Resource = {
  _id: string;
  title: string;
  kind?: string;
  body?: any[];
  image?: any;
  pdfUrl?: string;
  pdfThumbnail?: any;
};

type Props = {
  resources: Resource[];
  label?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
};

function getResourceUrl(resource: Resource): string | null {
  if (resource.kind === "image" && resource.image) return urlFor(resource.image).url();
  if (resource.pdfUrl) return resource.pdfUrl;
  return null;
}

function getFileName(resource: Resource, index: number): string {
  const safe = resource.title.replace(/[^a-z0-9 _-]/gi, "").trim() || `resource-${index + 1}`;
  const ext = resource.kind === "image" ? ".webp" : ".pdf";
  return `${safe}${ext}`;
}

function getRichTextPreviewUrl(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="64" viewBox="0 0 96 64">
    <rect width="96" height="64" fill="#f8fafc"/>
    <rect x="8" y="9"  width="56" height="4" rx="2" fill="#94a3b8"/>
    <rect x="8" y="19" width="76" height="3" rx="1.5" fill="#e2e8f0"/>
    <rect x="8" y="26" width="70" height="3" rx="1.5" fill="#e2e8f0"/>
    <rect x="8" y="33" width="74" height="3" rx="1.5" fill="#e2e8f0"/>
    <rect x="8" y="40" width="60" height="3" rx="1.5" fill="#e2e8f0"/>
    <rect x="8" y="47" width="50" height="3" rx="1.5" fill="#e2e8f0"/>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function getPreviewUrl(resource: Resource): string | null {
  if (resource.kind === "image" && resource.image) return urlFor(resource.image).width(96).height(64).url();
  if (resource.kind === "pdf" && resource.pdfThumbnail) return urlFor(resource.pdfThumbnail).width(96).height(64).url();
  if (resource.kind === "richText") return getRichTextPreviewUrl();
  return null;
}

function buildPdfBlob(resource: Resource): Blob {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(resource.title, margin, 60, { maxWidth });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setLineHeightFactor(1.8);

  let y = 100;
  for (const block of resource.body ?? []) {
    const text = (block.children ?? []).map((c: any) => c.text).join("");
    if (!text) continue;
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    const blockHeight = lines.length * 13 * 1.8;
    if (y + blockHeight > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, margin, y);
    y += blockHeight + 10;
  }

  return doc.output("blob");
}

export function DownloadAllButton({
  resources,
  label = "Download All Resources",
  buttonColor = "#09b23f",
  buttonHoverColor = "#089a38",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  const downloadableResources = resources.filter(
    (r) => getResourceUrl(r) !== null || r.kind === "richText"
  );

  const previewImages = resources
    .map((r) => getPreviewUrl(r))
    .filter((url): url is string => url !== null)
    .slice(0, 3);

  async function handleDownloadAll() {
    if (loading || downloadableResources.length === 0) return;
    setLoading(true);

    try {
      const zip = new JSZip();

      await Promise.all(
        downloadableResources.map(async (resource, index) => {
          const fileName = getFileName(resource, index);
          if (resource.kind === "richText") {
            zip.file(fileName, buildPdfBlob(resource));
            return;
          }
          const url = getResourceUrl(resource)!;
          const res = await fetch(`/api/pdf?url=${encodeURIComponent(url)}`);
          if (!res.ok) return;
          const blob = await res.blob();
          zip.file(fileName, blob);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      const blobUrl = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "resources.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } finally {
      setLoading(false);
    }
  }

  if (downloadableResources.length === 0) return null;

  return (
    <button
      onClick={handleDownloadAll}
      disabled={loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer py-2 pt-4 px-3 rounded-md disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none transition-colors"
      style={{ backgroundColor: hovered && !loading ? buttonHoverColor : buttonColor }}
    >
      {loading ? (
        <span className="inline-flex items-center gap-3 rounded-xl py-2 px-3 text-white font-semibold">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Preparing download…</span>
        </span>
      ) : (
        <ImagesBadge text={label} images={previewImages} />
      )}
    </button>
  );
}
