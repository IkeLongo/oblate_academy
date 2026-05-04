/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { FiPrinter } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import PrintButton from "@/app/ui/components/buttons/PrintButton";

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
    ((resource.kind === "link" || resource.kind === "video") && !!resource.url);

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
          <PrintButton
            pdfUrl={resource.kind === "pdf" ? resource.pdfUrl : undefined}
            imageUrl={resource.kind === "image" ? resource.imageUrl : undefined}
            title={resource.title}
            ariaLabel={printLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white/80 transition"
          >
            <FiPrinter className="w-6 h-6 text-blue-400" />
          </PrintButton>
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
            ) : (
              <FiExternalLink className="w-6 h-6 text-blue-400" />
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
