"use client";

import { useRouter } from "next/navigation";
import { GradeDropdown } from "@/app/ui/pages/home/client/GradeContentDropdown";
import { toGradeLink } from "@/app/types/types";

import type { GradeKey } from "@/app/types/types";

const GRADE_OPTIONS = [
  { value: "gk_2", label: "Kinder - 2nd Grade" },
  { value: "g3_5", label: "3rd - 5th Grade" },
] as const satisfies ReadonlyArray<{ value: GradeKey; label: string }>;

export function GradeSwitcher({
  grade,
  slug,
  basePath,
  enabledGrades,
}: {
  grade: GradeKey;
  slug: string;
  basePath: "saints" | "virtues";
  enabledGrades: Record<GradeKey, boolean>;
}) {
  const router = useRouter();

  const options = GRADE_OPTIONS.filter((opt) => enabledGrades[opt.value]);

  return (
    <GradeDropdown
      grade={grade}
      options={options}
      onChange={(nextGrade) => {
        const gradeLink = toGradeLink(nextGrade); // ✅ convert only at routing edge
        router.push(`/grade/${gradeLink}/${basePath}/${slug}`, { scroll: false });
      }}
      compact={true}
    />
  );
}
