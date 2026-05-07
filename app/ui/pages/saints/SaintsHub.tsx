import { type HubCardProps } from "@/app/ui/components/cards/HubCard";
import { HubHeader } from "@/app/ui/components/nav/HubHeader";
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
    <div className="base bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200 mx-auto px-6 py-20 pt-0 navdesk:py-16">
      <div className="max-w-6xl mx-auto pt-12 navdesk:pt-0">

        {/* Header row */}
        <HubHeader
          grade={grade}
          eyebrow={GRADE_LABEL[grade]}
          title="Meet the Saints"
        />

        {/* Search + grid (client island handles filter state) */}
        <SaintsHubClient cards={cards} />

        {/* Footer nav */}
        {/* <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm font-poppins font-semibold text-blue-300 hover:text-blue-400 underline underline-offset-2"
          >
            ← Back to Home
          </Link>
        </div> */}

      </div>
    </div>
  );
}
