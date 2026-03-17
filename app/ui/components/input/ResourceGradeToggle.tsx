"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { GradeKey } from "@/app/types";
import { GradeDropdown } from "@/app/ui/pages/home/client/GradeContentDropdown";

const options = [
  { value: "gk_2", label: "Kinder - 2nd Grade" },
  { value: "g3_5", label: "3rd - 5th Grade" },
] as const satisfies ReadonlyArray<{ value: GradeKey; label: string }>;

export function ResourceGradeToggle({ defaultGrade }: { defaultGrade: GradeKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const gradeFromUrl = (searchParams.get("grade") as GradeKey) || defaultGrade;
  const [grade, setGrade] = useState<GradeKey>(gradeFromUrl);

  useEffect(() => setGrade(gradeFromUrl), [gradeFromUrl]);

  function onChange(next: GradeKey) {
    setGrade(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("grade", next);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return <GradeDropdown grade={grade} options={options} onChange={onChange} compact />;
}
