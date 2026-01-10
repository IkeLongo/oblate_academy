// app/ui/pages/home/client/GradeContentClient.tsx

"use client";

import { useMemo, useState } from "react";
import { ContentRow } from "@/app/ui/pages/home/ContentRow";
import { GradeDropdown } from "./GradeContentDropdown";

import type { GradeKey } from "@/app/types/types";
import type { ContentCardModel } from "@/app/types/types";

type Props = {
  initialGrade?: GradeKey;
  options: { value: GradeKey; label: string }[];
  dataByGrade: Record<
    GradeKey,
    {
      saintsCards: ContentCardModel[];
      virtuesCards: ContentCardModel[];
    }
  >;
};

export default function GradeContentClient({
  initialGrade = "k2",
  options,
  dataByGrade,
}: Props) {
  const [grade, setGrade] = useState<GradeKey>(initialGrade);

  const current = useMemo(() => dataByGrade[grade], [dataByGrade, grade]);

  return (
    <div className="base bg-gray-100 relative pb-16">
      <img
        src="/cloud-border-white.webp"
        alt="Cloud border"
        className="absolute -top-10 left-1/2 -translate-x-1/2 min-w-[110vw] h-auto pointer-events-none select-none z-10"
      />

      <section className="space-y-16 bg-gray-100 relative z-20">
        <div className="flex flex-col md:flex-row md:justify-end mb-0">
          <GradeDropdown grade={grade} options={options} onChange={setGrade} />
        </div>
        <ContentRow title="Meet the Saints" cards={current.saintsCards} startColorIndex={0} />
        <ContentRow title="Grow in Virtues" cards={current.virtuesCards} startColorIndex={3} />
      </section>
    </div>
  );
}

