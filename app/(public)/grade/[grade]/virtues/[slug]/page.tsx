// app/[grade]/saints/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchVirtuePage } from "@/sanity/lib/fetch/fetchVirtuePage";
import { VirtueMain } from "@/app/ui/pages/virtues/VirtueMain";
import ParentTeacherResources from "@/app/ui/shared/ParentTeacherResources";

import { isGradeLink, toGradeKey } from "@/app/types/types";

import type { GradeKey } from "@/app/types/types";

type PageProps = {
  params: Promise<{ grade: string; slug: string }>;
};

export default async function VirtuePage({ params }: PageProps) {
  const { grade, slug } = await params;

  if (!isGradeLink(grade)) notFound();

  const gradeKey = toGradeKey(grade); // ✅ "gk_2" | "g3_5" for Sanity queries

  const data = await fetchVirtuePage({ slug, grade: gradeKey });
  if (!data) notFound();

  return (
    <>
      <VirtueMain grade={gradeKey as GradeKey} slug={slug} data={data} />
      <ParentTeacherResources />
    </>
  );
}