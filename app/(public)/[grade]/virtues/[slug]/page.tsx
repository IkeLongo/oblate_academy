// app/[grade]/saints/[slug]/page.tsx
import { notFound } from "next/navigation";
import { fetchVirtuePage } from "@/sanity/lib/fetch/fetchVirtuePage";
import { VirtueMain } from "@/app/ui/pages/virtues/VirtueMain";
import ParentTeacherResources from "@/app/ui/shared/ParentTeacherResources";

type PageProps = {
  params: Promise<{ grade: string; slug: string }>;
};

export default async function VirtuePage({ params }: PageProps) {
  const { grade, slug } = await params;

  // ✅ validate grade so bad routes don't loop
  if (grade !== "k2" && grade !== "g3_5") notFound();

  const data = await fetchVirtuePage({ slug, grade });
  if (!data) notFound();

  return (
    <>
      <VirtueMain grade={grade} slug={slug} data={data} />
      <ParentTeacherResources />
    </>
  );
}