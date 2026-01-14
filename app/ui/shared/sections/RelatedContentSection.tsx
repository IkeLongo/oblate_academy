// app/ui/components/sections/RelatedContentSection.tsx
import React from "react";
import { ContentCard } from "@/app/ui/components/cards/ContentCard";
import { urlFor } from "@/sanity/lib/image";

import type { ImageAsset } from '@sanity/types';
import type { RelatedSectionTheme, CardColorConfig } from "@/app/types/types";

type RelatedItem = {
  _id: string;
  name: string;
  slug: string;
  cardImage?: {
    asset?: ImageAsset;
    alt?: string;
  };
};

type Props = {
  gradeHref: "k-2" | "3-5";
  basePath: "saints" | "virtues";
  items: RelatedItem[];
  title: string;
  theme?: RelatedSectionTheme;
  className?: string;
  limit?: number;
};

// --- sensible defaults ---
const defaultCardColors: CardColorConfig[] = [
  { text: "text-green-600", border: "border-green-500", bg: "bg-green-200" },
  { text: "text-blue-500", border: "border-blue-400", bg: "bg-blue-100" },
];

const defaultTheme: RelatedSectionTheme = {
  sectionBg: "bg-blue-200",
  headingText: "text-blue-400",
  cardColors: defaultCardColors,
};

export default function RelatedContentSection({
  gradeHref,
  basePath,
  items,
  title,
  theme = defaultTheme,
  className = "",
  limit = 3,
}: Props) {
  const { sectionBg, headingText, cardColors = defaultCardColors } = theme;
  const sliced = Array.isArray(items) ? items.slice(0, limit) : [];

  function cardColorForIndex(i: number): CardColorConfig {
    if (cardColors.length === 1) return cardColors[0];
    return cardColors[i % cardColors.length];
  }

  return (
    <section className={`base w-full py-16 md:py-20 ${sectionBg} ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <h2
          className={`text-center text-4xl md:text-5xl font-extrabold font-fredoka ${
            headingText ?? ""
          }`}
        >
          {title}
        </h2>

        <div className="mt-10 md:mt-12">
          <div className="-mx-6 px-6 overflow-x-auto pb-2 md:overflow-visible md:pb-0">
            <div className="flex gap-8 md:gap-10 md:justify-center min-w-max md:min-w-0">
              {sliced.map((item, i) => (
                <ContentCard
                  key={item._id}
                  title={item.name}
                  href={`/grade/${gradeHref}/${basePath}/${item.slug}`}
                  imageSrc={
                    item.cardImage
                      ? urlFor(item.cardImage)
                          .width(800)
                          .height(450)
                          .fit("crop")
                          .auto("format")
                          .url()
                      : ""
                  }
                  imageAlt={item.cardImage?.alt || ""}
                  color={cardColorForIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
