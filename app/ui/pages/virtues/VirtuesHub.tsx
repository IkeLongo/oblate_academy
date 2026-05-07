import { type HubCardProps } from "@/app/ui/components/cards/HubCard";
import { HubHeader } from "@/app/ui/components/nav/HubHeader";
import { VirtuesHubClient } from "./client/VirtuesHubClient";

import type { GradeKey, GradeKeyLink } from "@/app/types";

type VirtuesHubProps = {
  grade: GradeKey;
  gradeHref: GradeKeyLink;
  cards: Omit<HubCardProps, "color">[];
};

const GRADE_LABEL: Record<GradeKey, string> = {
  gk_2: "Kinder – 2nd Grade",
  g3_5: "3rd – 5th Grade",
};

export function VirtuesHub({ grade, gradeHref, cards }: VirtuesHubProps) {
  return (
    <div className="base bg-gradient-to-b from-blue-100 via-gray-100 to-blue-100 mx-auto px-6 py-20 pt-0 navdesk:py-16">
      <div className="max-w-6xl mx-auto pt-12 navdesk:pt-0">

        {/* Header row */}
        <HubHeader
          grade={grade}
          eyebrow={GRADE_LABEL[grade]}
          title="Explore Virtues"
        />

        {/* Search + grid (client island handles filter state) */}
        <VirtuesHubClient cards={cards} />

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
