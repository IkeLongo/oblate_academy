// app/[grade]/saints/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { saintPageQuery } from "@/sanity/lib/queries/saintPageQueries";
import { SaintMain } from "@/app/ui/pages/saints/SaintMain";
import ParentTeacherResources from "@/app/ui/shared/resources/ParentTeacherResources";
import RelatedVirtues from "@/app/ui/pages/saints/RelatedVirtues";
import { isGradeLink, toGradeKey } from "@/app/types";
import { draftMode } from "next/headers";

import type { GradeKey } from "@/app/types";

type PageProps = {
  params: Promise<{ grade: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch<{ name: string } | null>(
    `*[_type == "saint" && slug.current == $slug][0]{ name }`,
    { slug }
  );
  const name = data?.name ?? slug;
  return {
    title: name,
    description: `Learn about Saint ${name} — faith stories, virtues, and activities for Catholic children.`,
    openGraph: { title: `Saint ${name} | Oblate Academy` },
  };
}

export default async function SaintPage({ params }: PageProps) {
  const { grade, slug } = await params;
  if (!isGradeLink(grade)) notFound();

  const gradeKey = toGradeKey(grade);
  const isDraft = (await draftMode()).isEnabled;

  const resourceGrade = gradeKey === "gk_2" ? "k2" : "g3_5";

  const { data } = await sanityFetch({
    query: saintPageQuery,
    params: { slug, grade: gradeKey, resourceGrade, isDraft },
  });

  // 🔍 Debug: Log what we're getting from Sanity
  // console.log('🔍 Saint Page Debug:', {
  //   slug,
  //   gradeKey,
  //   resourceGrade,
  //   hasData: !!data,
  //   resourceCount: data?.resources?.length ?? 0,
  //   resources: data?.resources
  // });

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
      <SaintMain
        grade={gradeKey as GradeKey}
        gradeHref={grade}        // ✅ pass route grade
        slug={slug}
        data={data}
      />
      <ParentTeacherResources />
      <RelatedVirtues gradeHref={grade} virtues={data.relatedVirtues} />
    </>
  );
}