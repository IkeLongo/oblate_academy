"use client";

import { useRouter } from "next/navigation";
import { GradeDropdown } from "@/app/ui/pages/home/client/GradeContentDropdown";

import type { GradeKeyLink } from "@/app/types/types";

export function GradeSwitcher({
  grade,
  slug,
  basePath,
  enabledGrades,
}: {
  grade: GradeKeyLink;
  slug: string;
  basePath: "saints" | "virtues";
  enabledGrades: { "k-2": boolean; "3-5": boolean };
}) {
  const router = useRouter();

  const options = [
    { value: "k-2" as const, label: "Kinder - 2nd Grade" },
    { value: "3-5" as const, label: "3rd - 5th Grade" },
  ].filter(opt => enabledGrades[opt.value]);

  return (
    <GradeDropdown
      grade={grade}
      options={options}
      onChange={(nextGrade) => {
        // ✅ route param swap (no search params)
        router.push(`/grade/${nextGrade}/${basePath}/${slug}`, { scroll: false });
      }}
      compact={true}
    />
  );
}
