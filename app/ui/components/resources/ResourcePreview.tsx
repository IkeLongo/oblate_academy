/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { PortableText } from "@portabletext/react";

type Resource = {
  _id: string;
  title?: string;
  kind: "image" | "pdf" | "link" | "video" | "richText" | string;
  pdfUrl?: string | null;
  url?: string | null;
  imageUrl?: string | null;
  imageUrls?: (string | null)[] | null;
  body?: any;
  category?: { title?: string | null } | null;
};

function getLabel(r: Resource) {
  return r.title || r.category?.title || "Resource";
}

function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}

function youtubeEmbed(url: string) {
  // very light conversion
  const id =
    url.includes("youtu.be/")
      ? url.split("youtu.be/")[1]?.split(/[?&]/)[0]
      : url.includes("v=")
      ? url.split("v=")[1]?.split("&")[0]
      : null;

  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function ResourcePreview({ r }: { r: Resource }) {
  const label = getLabel(r);

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="text-lg font-bold text-slate-900">{label}</div>

      <div className="mt-2 text-sm text-slate-600">
        {r.kind === "image"
          ? "Image"
          : r.kind === "pdf"
          ? "PDF"
          : r.kind === "video"
          ? "Video"
          : r.kind === "link"
          ? "Link"
          : r.kind === "richText"
          ? "Reading"
          : "Resource"}
      </div>

      {/* Inline preview */}
      <div className="mt-4">
        {r.kind === "image" && r.imageUrl ? (
          <div className="relative w-full overflow-hidden rounded-xl border bg-slate-50">
            {/* Adjust height to match your design */}
            <div className="relative aspect-[8/10] w-full">
              <Image
                src={r.imageUrl}
                alt={label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>
        ) : r.kind === "pdf" && r.pdfUrl ? (
          <div className="overflow-hidden rounded-xl border">
            {/* Inline PDF view */}
            <iframe
              title={label}
              src={r.pdfUrl}
              className="h-[520px] w-full"
            />
          </div>
        ) : (r.kind === "video" || r.kind === "link") && r.url ? (
          <>
            {/* Try embed for YouTube (extend later for Vimeo etc.) */}
            {r.kind === "video" && isYouTube(r.url) ? (
              <div className="overflow-hidden rounded-xl border">
                <iframe
                  title={label}
                  src={youtubeEmbed(r.url) ?? r.url}
                  className="h-[360px] w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}

            <a
              className="mt-3 inline-block font-semibold text-blue-700 hover:underline"
              href={r.url}
              target="_blank"
              rel="noreferrer"
            >
              Open {r.kind === "video" ? "video" : "link"}
            </a>
          </>
        ) : r.kind === "richText" && Array.isArray(r.body) ? (
          <div className="prose prose-slate max-w-none">
            <PortableText value={r.body} />
          </div>
        ) : Array.isArray(r.imageUrls) && r.imageUrls.length > 0 ? (
          // Optional: gallery support if you add it later
          <div className="grid grid-cols-2 gap-3">
            {r.imageUrls.filter(Boolean).map((u) => (
              <div key={u as string} className="relative aspect-[8/10] w-full overflow-hidden rounded-xl border bg-slate-50">
                <Image
                  src={u as string}
                  alt={label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-500">No preview available.</div>
        )}
      </div>

      {/* Optional: Always show a direct open/download */}
      <div className="mt-4">
        {r.kind === "pdf" && r.pdfUrl ? (
          <a
            className="font-semibold text-blue-700 hover:underline"
            href={r.pdfUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF
          </a>
        ) : null}
        {r.kind === "image" && r.imageUrl ? (
          <a
            className="font-semibold text-blue-700 hover:underline"
            href={r.imageUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open image
          </a>
        ) : null}
      </div>
    </div>
  );
}
