import React from "react";
import Link from "next/link";
import { ContentCard } from "../../components/cards/ContentCard";
import type { ContentCardModel } from "@/app/types";

const colorConfigs = [
  { text: "text-blue-300", border: "border-blue-300", bg: "bg-blue-100" },
  { text: "text-green-500", border: "border-green-500", bg: "bg-green-200" },
  { text: "text-red-500", border: "border-red-500", bg: "bg-red-100" },
  { text: "text-yellow-700", border: "border-yellow-700", bg: "bg-yellow-100" },
];

export function ContentRow({
  title,
  cards,
  startColorIndex = 0,
  viewAllHref,
  viewAllLabel = "View All",
}: {
  title: string;
  cards: ContentCardModel[];
  startColorIndex?: number;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  const heading = <h3 className="text-3xl font-extrabold text-blue-400">{title}</h3>;

  return (
    <div className="space-y-4">
      {viewAllHref ? (
        <div className="flex items-center justify-between gap-x-4 gap-y-1 flex-wrap">
          {heading}
          <Link
            href={viewAllHref}
            className="inline-flex items-center py-2 text-sm font-poppins font-semibold text-blue-400 hover:text-blue-500 underline underline-offset-2"
          >
            {viewAllLabel} →
          </Link>
        </div>
      ) : (
        heading
      )}

      <div className="-mr-4 sm:-mr-6 lg:-mr-8 -ml-4 sm:-ml-6 lg:-ml-8 overflow-x-auto pb-2 scroll-pr-4 sm:scroll-pr-6 lg:scroll-pr-8">
        <div className="flex gap-6">
          {cards.map((c, i) => {
            const color = colorConfigs[(startColorIndex + i) % colorConfigs.length];
            // Add right padding only to the last card
            const isLast = i === cards.length - 1;
            const isFirst = i === 0;
            return (
              <div
                key={c.href}
                className={[
                  isFirst ? 'pl-4 sm:pl-6 lg:pl-8' : '',
                  isLast ? 'pr-4 sm:pr-6 lg:pr-8' : ''
                ].join(' ').trim()}
              >
                <ContentCard {...c} color={color} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
