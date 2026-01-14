// app/[grade]/saints/[slug]/page.tsx
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { virtuePageQuery } from "@/sanity/lib/queries/virtuePageQueries";
import { VirtueMain } from "@/app/ui/pages/virtues/VirtueMain";
import ParentTeacherResources from "@/app/ui/shared/ParentTeacherResources";
import { isGradeLink, toGradeKey } from "@/app/types/types";
import RelatedSaints from "@/app/ui/pages/virtues/RelatedSaints";

import type { GradeKey } from "@/app/types/types";
import { draftMode } from "next/headers";

type PageProps = {
  params: Promise<{ grade: string; slug: string }>;
};

export default async function VirtuePage({ params }: PageProps) {
  const { grade, slug } = await params;
  if (!isGradeLink(grade)) notFound();

  const gradeKey = toGradeKey(grade); // ✅ "gk_2" | "g3_5" for Sanity queries
  const isDraft = (await draftMode()).isEnabled;

  const resourceGrade = gradeKey === "gk_2" ? "k2" : "g3_5";

  const { data } = await sanityFetch({
    query: virtuePageQuery,
    params: { slug, grade: gradeKey, resourceGrade, isDraft },
  });

  // ✅ Never notFound() while in draft/presentation
  if (!data) {
    if (isDraft) {
      return (
        <div className="p-6">
          <p className="text-lg font-bold">Preview updating…</p>
          <p className="text-sm text-slate-600">
            This can happen briefly while editing. Try again in a moment.
          </p>
        </div>
      );
    }
    notFound();
  }

  return (
    <>
      <VirtueMain
        grade={gradeKey as GradeKey}
        gradeHref={grade}        // ✅ pass route grade
        slug={slug}
        data={data}
      />
      <ParentTeacherResources />
      <RelatedSaints gradeHref={grade} saints={data.relatedSaints} />
    </>
  );
}