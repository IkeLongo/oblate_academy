"use client";

import { useState, useMemo } from "react";
import { Input } from "@/app/ui/components/input/Input";
import { HubCard, type HubCardProps } from "@/app/ui/components/cards/HubCard";

const colorConfigs = [
  { text: "text-blue-300", border: "border-blue-300", bg: "bg-blue-100" },
  { text: "text-green-500", border: "border-green-500", bg: "bg-green-200" },
  { text: "text-red-500", border: "border-red-500", bg: "bg-red-100" },
  { text: "text-yellow-700", border: "border-yellow-700", bg: "bg-yellow-100" },
];

type VirtuesHubClientProps = {
  cards: Omit<HubCardProps, "color">[];
};

export function VirtuesHubClient({ cards }: VirtuesHubClientProps) {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return cards;
    return cards.filter((c) => c.title.toLowerCase().includes(f));
  }, [cards, filter]);

  return (
    <>
      {/* Search input */}
      <div className="mb-8 max-w-sm">
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search virtues by name…"
          type="search"
        />
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-black/40 font-inria text-base">
          {filter
            ? `No virtues found matching "${filter}".`
            : "No virtues available for this grade yet. Check back soon!"}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filtered.map((card, i) => (
            <HubCard
              key={card.href}
              {...card}
              color={colorConfigs[i % colorConfigs.length]}
            />
          ))}
        </div>
      )}
    </>
  );
}
