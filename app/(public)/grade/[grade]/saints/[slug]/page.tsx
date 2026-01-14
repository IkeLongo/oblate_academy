// app/[grade]/saints/[slug]/page.tsx
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { saintPageQuery } from "@/sanity/lib/queries/saintPageQueries";
import { SaintMain } from "@/app/ui/pages/saints/SaintMain";
import ParentTeacherResources from "@/app/ui/shared/ParentTeacherResources";
import RelatedVirtues from "@/app/ui/pages/saints/RelatedVirtues";
import { isGradeLink, toGradeKey } from "@/app/types/types";

import type { GradeKey } from "@/app/types/types";

type PageProps = {
  params: Promise<{ grade: string; slug: string }>;
};

export default async function SaintPage({ params }: PageProps) {

  const { grade, slug } = await params;
  if (!isGradeLink(grade)) notFound();
  const gradeKey = toGradeKey(grade); // ✅ "gk_2" | "g3_5" for Sanity queries

  const { data } = await sanityFetch({
    query: saintPageQuery,
    params: { slug, grade: gradeKey },
  });
  if (!data) notFound();

  return (
    <>
      <SaintMain grade={gradeKey as GradeKey} slug={slug} data={data} />
      <ParentTeacherResources />
      <RelatedVirtues cards={data.relatedVirtuesCards} />
    </>
  );
}
