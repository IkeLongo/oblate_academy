"use client";

import { useCallback, useState } from "react";
import { cn, getResourceDisplayTitle } from "@/app/lib/utils";
import type { Resource } from "@/app/types";
import type { HomepageFeaturedResourcesData } from "@/sanity/lib/queries/homepageFeaturedResourcesQuery";
import { FeaturedResourceCard } from "@/app/ui/components/cards/FeaturedResourceCard";
import { ResourceModal, type ModalResource } from "@/app/ui/pages/resources/ResourceModal";

type Items = NonNullable<HomepageFeaturedResourcesData>["items"];

// GROQ returns null for absent fields; ModalResource expects undefined.
function toModalResource(r: Resource): ModalResource {
  const asset = r.muxVideo?.asset;
  return {
    _id: r._id,
    title: getResourceDisplayTitle(r),
    kind: r.kind,
    body: r.body ?? undefined,
    image: r.image ?? undefined,
    pdfUrl: r.pdfUrl ?? undefined,
    pdfThumbnail: r.pdfThumbnail ?? undefined,
    url: r.url ?? undefined,
    muxVideo: asset
      ? {
          asset: {
            playbackId: asset.playbackId ?? undefined,
            aspectRatio: asset.aspectRatio ?? undefined,
          },
        }
      : undefined,
  };
}

export default function FeaturedResourcesClient({ items }: { items: Items }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const handleClose = useCallback(() => setSelectedId(null), []);

  const selected = items.find((i) => i.resource._id === selectedId)?.resource ?? null;
  const count = items.length;

  const containerClass = cn(
    count === 1 && "mx-auto max-w-5xl",
    count > 1 && "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8",
    count === 3 && "lg:grid-cols-3"
  );

  return (
    <>
      <div className={containerClass}>
        {items.map((item, index) => (
          <FeaturedResourceCard
            key={item._key}
            resource={item.resource}
            featuredTitle={item.featuredTitle}
            description={item.description}
            layout={count === 1 ? "feature" : "stacked"}
            wideAtMd={count === 3 && index === 2}
            className={count === 3 && index === 2 ? "md:col-span-2 lg:col-span-1" : undefined}
            onOpen={() => setSelectedId(item.resource._id)}
          />
        ))}
      </div>

      <ResourceModal resource={selected ? toModalResource(selected) : null} onClose={handleClose} />
    </>
  );
}
