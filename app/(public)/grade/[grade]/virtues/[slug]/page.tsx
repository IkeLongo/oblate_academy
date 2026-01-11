// app/[grade]/saints/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchVirtuePage } from "@/sanity/lib/fetch/fetchVirtuePage";
import { VirtueMain } from "@/app/ui/pages/virtues/VirtueMain";
import ParentTeacherResources from "@/app/ui/shared/ParentTeacherResources";

import { GradeKey, GradeKeyLink } from "@/app/types/types";

type PageProps = {
  params: Promise<{ grade: string; slug: string }>;
};

export default async function VirtuePage({ params }: PageProps) {
  const { grade, slug } = await params;

  // ✅ validate grade so bad routes don't loop
  // ✅ validate grade so bad routes don't loop
  let gradeDisplay: string;
  let internalGrade: string;
  if (grade === "gk_2" || grade === "k-2") {
    gradeDisplay = "k-2";
    internalGrade = "gk_2";
  } else if (grade === "g3_5" || grade === "3-5") {
    gradeDisplay = "3-5";
    internalGrade = "g3_5";
  } else {
    notFound();
  }

  const data = await fetchVirtuePage({ slug, grade: internalGrade as GradeKey });
  if (!data) notFound();

  return (
    <>
      <VirtueMain grade={gradeDisplay as GradeKeyLink} slug={slug} data={data} />
      <ParentTeacherResources />
    </>
  );
}