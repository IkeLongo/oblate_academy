/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import { ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export type ResourceMediaProps = {
  id: string;
  kind: string;
  label: string;
  image?: any;
  pdfThumbnail?: any;
  url?: string | null;
  muxPlaybackId?: string | null;
  excerpt?: string;
  priority?: boolean;
  // Height of the link preview; the default keeps the original fixed height.
  linkHeightClass?: string;
};

function LinkCardContent({ url, label, heightClass }: { url?: string | null; label: string; heightClass: string }) {
  const [preview, setPreview] = useState<{ image: string | null } | null>(null); // null = loading

  useEffect(() => {
    if (!url) {
      setPreview({ image: null });
      return;
    }
    const controller = new AbortController();
    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setPreview({ image: data?.data?.image?.url ?? null }))
      .catch((err) => {
        if (err.name !== "AbortError") setPreview({ image: null });
      });
    return () => controller.abort();
  }, [url]);

  if (preview === null) {
    // shimmer while loading
    return <div className="w-full h-full animate-pulse bg-blue-100" />;
  }

  if (preview.image) {
    return (
      <div className={`relative w-full ${heightClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.image}
          alt={label}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
          <ExternalLink className="h-7 w-7 text-white drop-shadow" />
          <span className="text-white text-base font-semibold tracking-wide drop-shadow">Learn More</span>
        </div>
      </div>
    );
  }

  // Fallback when no OG image found
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white/80 gap-3 px-4">
      <span className="text-5xl">🔗</span>
      <span className="text-blue-600 text-sm font-semibold text-center break-all line-clamp-3">{url}</span>
    </div>
  );
}

// Fills its parent: the parent must be positioned and sized (Image uses `fill`).
export function ResourceMedia({
  id,
  kind,
  label,
  image,
  pdfThumbnail,
  url,
  muxPlaybackId,
  excerpt,
  priority,
  linkHeightClass = "h-80",
}: ResourceMediaProps) {
  if (kind === "image" && image?.asset) {
    return (
      <Image
        src={urlFor(image).width(1200).height(1500).fit("crop").auto("format").url()}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-top"
        priority={priority}
      />
    );
  }

  if (kind === "pdf" && pdfThumbnail) {
    return (
      <Image
        src={urlFor(pdfThumbnail).width(1200).height(1500).fit("crop").auto("format").url()}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-top"
        priority={priority}
      />
    );
  }

  if (kind === "video" && muxPlaybackId) {
    return (
      <MuxPlayer
        playbackId={muxPlaybackId}
        thumbnailTime={0}
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        metadata={{ video_id: id, video_title: label }}
      />
    );
  }

  if (kind === "richText" && excerpt) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-white/80 px-4 py-6">
        <span className="block text-4xl mb-2" role="img" aria-label="Memo" style={{fontFamily: 'Fredoka, Arial, sans-serif', fontWeight: 600}}>📝</span>
        <span className="block text-gray-700 text-base text-center italic" style={{fontFamily: 'Poppins, Arial, sans-serif', lineHeight: 1.7}}>
          {excerpt}
        </span>
      </div>
    );
  }

  if (kind === "link") {
    return <LinkCardContent url={url} label={label} heightClass={linkHeightClass} />;
  }

  // Fallback icons for unknown types
  const icon = kind === "video" ? "🎬" : "❓";
  const text = kind === "video" ? "Watch Video" : "Unknown Type";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white/80">
      <span className="text-5xl mb-2">{icon}</span>
      <span className="text-blue-600 underline text-base font-bold">{text}</span>
    </div>
  );
}
