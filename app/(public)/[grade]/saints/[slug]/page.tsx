// app/[grade]/saints/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchSaintPage } from "@/sanity/lib/fetch/fetchSaintPage";
import { SaintMain } from "@/app/ui/pages/saints/SaintMain";
import ParentTeacherResources from "@/app/ui/shared/ParentTeacherResources";
import RelatedVirtues from "@/app/ui/pages/saints/RelatedVirtues";

type PageProps = {
  params: Promise<{ grade: string; slug: string }>;
};

export default async function SaintPage({ params }: PageProps) {
  const { grade, slug } = await params;

  // ✅ validate grade so bad routes don't loop
  if (grade !== "k2" && grade !== "g3_5") notFound();

  const data = await fetchSaintPage({ slug, grade });
  if (!data) notFound();

  return (
    <>
      <SaintMain grade={grade} slug={slug} data={data} />
      <ParentTeacherResources />
      <RelatedVirtues cards={data.relatedVirtuesCards} />
    </>
  );
}
