import Link from "next/link";
import { type HubCardProps } from "@/app/ui/components/cards/HubCard";
import { HubGradeSwitcher } from "@/app/ui/components/input/HubGradeSwitcher";
import { SaintsHubClient } from "./client/SaintsHubClient";

import type { GradeKey, GradeKeyLink } from "@/app/types";

type SaintsHubProps = {
  grade: GradeKey;
  gradeHref: GradeKeyLink;
  cards: Omit<HubCardProps, "color">[];
};

const GRADE_LABEL: Record<GradeKey, string> = {
  gk_2: "Kinder – 2nd Grade",
  g3_5: "3rd – 5th Grade",
};

export function SaintsHub({ grade, gradeHref, cards }: SaintsHubProps) {
  return (
    <div className="base bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200 mx-auto px-6 py-20 navdesk:py-16">
      <div className="max-w-6xl mx-auto pt-16 navdesk:pt-0">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
              {GRADE_LABEL[grade]}
            </p>
            <h1 className="mt-1 font-fredoka font-extrabold text-4xl md:text-5xl text-blue-300">
              Meet the Saints
            </h1>
          </div>

          <div className="md:min-w-[280px]">
            <HubGradeSwitcher grade={grade} basePath="saints" />
          </div>
        </div>

        {/* Search + grid (client island handles filter state) */}
        <SaintsHubClient cards={cards} />

        {/* Footer nav */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm font-poppins font-semibold text-blue-300 hover:text-blue-400 underline underline-offset-2"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
