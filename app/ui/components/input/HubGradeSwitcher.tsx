"use client";

import { useRouter, usePathname } from "next/navigation";
import { GradeDropdown } from "@/app/ui/pages/home/client/GradeContentDropdown";
import { toGradeLink } from "@/app/types";

import type { GradeKey } from "@/app/types";

const GRADE_OPTIONS = [
  { value: "gk_2", label: "Kinder - 2nd Grade" },
  { value: "g3_5", label: "3rd - 5th Grade" },
] as const satisfies ReadonlyArray<{ value: GradeKey; label: string }>;

type HubGradeSwitcherProps = {
  grade: GradeKey;
};

export function HubGradeSwitcher({ grade }: HubGradeSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <GradeDropdown
      grade={grade}
      options={GRADE_OPTIONS}
      compact
      onChange={(nextGrade) => {
        // pathname is always /grade/{gradeLink}/...
        // Replace only the grade segment (index 2) and preserve everything else.
        const segments = pathname.split("/");
        segments[2] = toGradeLink(nextGrade);
        router.push(segments.join("/"), { scroll: false });
      }}
    />
  );
}
