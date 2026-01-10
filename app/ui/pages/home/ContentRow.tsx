import React from "react";
import { ContentCard } from "../../components/cards/ContentCard";
import type { ContentCardModel } from "@/app/types/types";

const colorConfigs = [
  { text: "text-blue-300", border: "border-blue-300", bg: "bg-blue-100" },
  { text: "text-green-500", border: "border-green-500", bg: "bg-green-200" },
  { text: "text-red-500", border: "border-red-500", bg: "bg-red-100" },
  { text: "text-yellow-600", border: "border-yellow-600", bg: "bg-yellow-100" },
];

export function ContentRow({
  title,
  cards,
  startColorIndex = 0,
}: {
  title: string;
  cards: ContentCardModel[];
  startColorIndex?: number;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-extrabold text-blue-400">{title}</h2>

      <div className="-mr-4 sm:-mr-6 lg:-mr-8 overflow-x-auto pb-2 scroll-pr-4 sm:scroll-pr-6 lg:scroll-pr-8">
        <div className="flex gap-6">
          {cards.map((c, i) => {
            const color = colorConfigs[(startColorIndex + i) % colorConfigs.length];
            // Add right padding only to the last card
            const isLast = i === cards.length - 1;
            return (
              <div key={c.href} className={isLast ? 'pr-4 sm:pr-6 lg:pr-8' : ''}>
                <ContentCard {...c} color={color} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
