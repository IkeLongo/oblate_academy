"use client";

import { useRouter } from "next/navigation";
import { GradeDropdown } from "@/app/ui/pages/home/client/GradeContentDropdown";
import type { GradeKey } from "@/app/types/types";

export function GradeSwitcher({
  grade,
  slug,
  basePath,
  enabledGrades,
}: {
  grade: GradeKey;
  slug: string;
  basePath: "saints" | "virtues";
  enabledGrades: { k2: boolean; g3_5: boolean };
}) {
  const router = useRouter();

  const options = [
    { value: "k2" as const, label: "Kinder - 2nd Grade" },
    { value: "g3_5" as const, label: "3rd - 5th Grade" },
  ].filter(opt => enabledGrades[opt.value]);

  return (
    <GradeDropdown
      grade={grade}
      options={options}
      onChange={(nextGrade) => {
        // ✅ route param swap (no search params)
        router.push(`/${nextGrade}/${basePath}/${slug}`, { scroll: false });
      }}
      compact={true}
    />
  );
}
