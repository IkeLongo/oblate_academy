"use client";

import { useRouter } from "next/navigation";
import { GradeDropdown } from "@/app/ui/pages/home/client/GradeContentDropdown";
import { toGradeLink } from "@/app/types";

import type { GradeKey } from "@/app/types";

const GRADE_OPTIONS = [
  { value: "gk_2", label: "Kinder - 2nd Grade" },
  { value: "g3_5", label: "3rd - 5th Grade" },
] as const satisfies ReadonlyArray<{ value: GradeKey; label: string }>;

type HubGradeSwitcherProps = {
  grade: GradeKey;
  basePath: "saints" | "virtues";
};

export function HubGradeSwitcher({ grade, basePath }: HubGradeSwitcherProps) {
  const router = useRouter();

  return (
    <GradeDropdown
      grade={grade}
      options={GRADE_OPTIONS}
      compact
      onChange={(nextGrade) => {
        const gradeLink = toGradeLink(nextGrade);
        router.push(`/grade/${gradeLink}/${basePath}`, { scroll: false });
      }}
    />
  );
}
