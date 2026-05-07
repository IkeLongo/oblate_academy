/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/app/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { Label } from "@/app/ui/components/input/Label";
import { Input } from "@/app/ui/components/input/Input";
import { LabelInputContainer } from "@/app/ui/components/input/LabelInputContainer";
import { ExternalLink } from "lucide-react";
import { ResourceModal, type ModalResource } from "@/app/ui/pages/resources/ResourceModal";

type Resource = {
  _id: string;
  title?: string | null;
  kind: "image" | "pdf" | "link" | "video" | "richText" | string;
  pdfThumbnail?: any;
  pdfUrl?: string | null;
  url?: string | null;
  muxVideo?: {
    asset?: {
      playbackId?: string | null;
      aspectRatio?: string | null;
      mp4Support?: string | null;
      staticRenditions?: Array<{ name: string; ext: string; status: string }> | null;
    } | null;
  } | null;
  image?: any;
  category?: { title?: string | null } | null;
  belongsTo?: { _type?: string; title?: string | null; name?: string | null } | null;
  body?: any[];
};

type ResourceCard = {
  id: string;
  label: string;
  href: string;
  kind: string;
  color: { text: string; border: string; bg: string; imgBorder: string };
  // kind-specific fields
  image?: any;
  pdfThumbnail?: any;
  url?: string | null;
  muxPlaybackId?: string | null;
  excerpt?: string;
};

const COLORS = [
  { text: "text-blue-300", border: "border-blue-100", bg: "bg-blue-100", imgBorder: "border-blue-200" },
  { text: "text-green-500", border: "border-green-200", bg: "bg-green-200", imgBorder: "border-green-300" },
  { text: "text-red-500", border: "border-red-150", bg: "bg-red-150", imgBorder: "border-red-200" },
  { text: "text-yellow-700", border: "border-yellow-200", bg: "bg-yellow-200", imgBorder: "border-yellow-300" },
];

// Single function to transform resource -> card
function toCard(r: Resource, index: number): ResourceCard {
  const label = r.belongsTo?.name || r.belongsTo?.title || r.title || r.category?.title || "Resource";
  let href = "#";
  let excerpt: string | undefined = undefined;
  if (r.kind === "pdf" && r.pdfUrl) {
    href = r.pdfUrl;
  } else if (r.kind === "image" && r.image?.asset) {
    // Use the direct image URL for printing
    href = urlFor(r.image).url();
  } else if ((r.kind === "link" || r.kind === "video") && r.url) {
    href = r.url;
  } else if (r.kind === "richText") {
    href = `/resources/resource/${r._id}`;
    // Try to extract excerpt from first block in body
    if (Array.isArray(r.body)) {
      const firstBlock = r.body.find(b => b._type === "block" && Array.isArray(b.children));
      if (firstBlock) {
        excerpt = firstBlock.children.map((c: any) => c.text).join("").slice(0, 160);
        if (excerpt?.length === 160) excerpt += "...";
      }
    }
  }
  return {
    id: r._id,
    label,
    href,
    kind: r.kind,
    color: COLORS[index % COLORS.length],
    image: r.kind === "image" ? r.image : undefined,
    pdfThumbnail: r.pdfThumbnail,
    url: r.url,
    muxPlaybackId: r.muxVideo?.asset?.playbackId,
    excerpt,
  };
}

function LinkCardContent({ card }: { card: ResourceCard }) {
  const [preview, setPreview] = useState<{ image: string | null } | null>(null); // null = loading

  useEffect(() => {
    if (!card.url) {
      setPreview({ image: null });
      return;
    }
    const controller = new AbortController();
    fetch(`https://api.microlink.io?url=${encodeURIComponent(card.url)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setPreview({ image: data?.data?.image?.url ?? null }))
      .catch((err) => {
        if (err.name !== "AbortError") setPreview({ image: null });
      });
    return () => controller.abort();
  }, [card.url]);

  if (preview === null) {
    // shimmer while loading
    return <div className="w-full h-full animate-pulse bg-blue-100" />;
  }

  if (preview.image) {
    return (
      <div className="relative w-full h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview.image}
          alt={card.label}
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
      <span className="text-blue-600 text-sm font-semibold text-center break-all line-clamp-3">{card.url}</span>
    </div>
  );
}

// Render content based on resource kind
function CardContent({ card, index }: { card: ResourceCard; index: number }) {
  if (card.kind === "image" && card.image?.asset) {
    return (
      <Image
        src={urlFor(card.image).width(1200).height(1500).fit("crop").auto("format").url()}
        alt={card.label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-top"
        priority={index < 3}
      />
    );
  }
  
  if (card.kind === "pdf" && card.pdfThumbnail) {
    return (
      <Image
        src={urlFor(card.pdfThumbnail).width(1200).height(1500).fit("crop").auto("format").url()}
        alt={card.label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-top"
        priority={index < 3}
      />
    );
  }
  
  if (card.kind === "video" && card.muxPlaybackId) {
    return (
      <MuxPlayer
        playbackId={card.muxPlaybackId}
        thumbnailTime={0}
        muted
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        metadata={{ video_id: card.id, video_title: card.label }}
      />
    );
  }
  
  if (card.kind === "richText" && card.excerpt) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-white/80 px-4 py-6">
        <span className="block text-4xl mb-2" role="img" aria-label="Memo" style={{fontFamily: 'Fredoka, Arial, sans-serif', fontWeight: 600}}>📝</span>
        <span className="block text-gray-700 text-base text-center italic" style={{fontFamily: 'Poppins, Arial, sans-serif', lineHeight: 1.7}}>
          {card.excerpt}
        </span>
      </div>
    );
  }
  
  if (card.kind === "link") {
    return <LinkCardContent card={card} />;
  }

  // Fallback icons for unknown types
  const icon = card.kind === "video" ? "🎬" : "❓";
  const text = card.kind === "video" ? "Watch Video" : "Unknown Type";
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white/80">
      <span className="text-5xl mb-2">{icon}</span>
      <span className="text-blue-600 underline text-base font-bold">{text}</span>
    </div>
  );
}

const ResourceCardItem = React.memo(
  ({ card, index, hovered, setHovered, onSelect }: { 
    card: ResourceCard; 
    index: number; 
    hovered: number | null; 
    setHovered: (i: number | null) => void;
    onSelect: () => void;
  }) => {
    return (
      <div onClick={onSelect} className="block h-full cursor-pointer">
        <div
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-2xl border-4 transition-all duration-300 ease-out",
            card.color.bg,
            card.color.border,
            hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
          )}
        >
          <div className={cn("relative w-full flex-1 min-h-48 md:min-h-72 overflow-hidden border-1 rounded-xl", card.color.imgBorder)}>
            <CardContent card={card} index={index} />
          </div>
          
          <div className={cn("shrink-0 w-full py-3 text-center text-lg font-semibold line-clamp-2 truncate", card.color.bg, card.color.text)}>
            {card.label}
          </div>
        </div>
      </div>
    );
  }
);

ResourceCardItem.displayName = "ResourceCardItem";

export function ResourceFocusCards({ resources, showFilter = true }: { resources: Resource[]; showFilter?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const cards = useMemo(() => {
    // Filter first
    const filtered = filter.trim()
      ? resources.filter(r => {
          const search = filter.toLowerCase();
          return (
            r.title?.toLowerCase().includes(search) ||
            r.belongsTo?.name?.toLowerCase().includes(search) ||
            r.belongsTo?.title?.toLowerCase().includes(search)
          );
        })
      : resources;
    
    // Transform to cards
    return filtered.map((r, i) => toCard(r, i));
  }, [resources, filter]);

  return (
    <div className="w-full flex flex-col">
      {showFilter && (
        <div className="w-full max-w-xs mb-10 self-start md:self-end">
          <LabelInputContainer>
            <Label htmlFor="filter">Filter by name</Label>
            <Input
              id="filter"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              placeholder="Search..."
              type="text"
            />
          </LabelInputContainer>
        </div>
      )}
      
      <div className="grid grid-cols-1 2xs:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10 max-w-6xl mx-auto w-full">
        {cards.map((card, index) => (
          <ResourceCardItem
            key={card.id}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onSelect={() => setSelectedResource(resources.find(r => r._id === card.id) ?? null)}
          />
        ))}
      </div>

      <ResourceModal
        resource={selectedResource ? { ...selectedResource, title: selectedResource.title ?? "Resource" } as ModalResource : null}
        onClose={() => setSelectedResource(null)}
      />
    </div>
  );
}
