import React from "react";
import { ContentCard } from "@/app/ui/components/cards/ContentCard";
import type { ContentCardModel } from "@/app/types/types";

type RelatedVirtuesSectionProps = {
  cards: ContentCardModel[]; // expects { title, href, imageSrc, imageAlt }
  title?: string;
  className?: string;
};

const greenConfig = {
  text: "text-green-600",
  border: "border-green-500",
  bg: "bg-green-200",
};

const blueConfig = {
  text: "text-blue-500",
  border: "border-blue-400",
  bg: "bg-blue-100",
};

// Outer cards green, middle blue (like screenshot)
function getColorByIndex(i: number, total: number) {
  if (total >= 3 && i === 1) return blueConfig; // middle
  return greenConfig; // outer
}

export default function RelatedVirtues({
  cards,
  title = "Related Virtues",
  className = "",
}: RelatedVirtuesSectionProps) {

  return (
    <section
      className={["w-full bg-blue-200", "py-16 md:py-20", className].join(" ")}
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-blue-400 font-fredoka">
          {title}
        </h2>

        {/* Cards */}
        <div className="mt-10 md:mt-12">
          {/* Mobile: horizontal scroll. Desktop: centered row */}
          <div className="-mx-6 px-6 overflow-x-auto pb-2 md:overflow-visible md:pb-0">
            <div className="flex gap-8 md:gap-10 md:justify-center min-w-max md:min-w-0">
              {Array.isArray(cards) && cards.length > 0
                ? cards.slice(0, 3).map((card, i) => (
                    <ContentCard
                      key={card.href}
                      title={card.title}
                      href={card.href}
                      imageSrc={card.imageSrc}
                      imageAlt={card.imageAlt}
                      color={getColorByIndex(i, cards.length)}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
