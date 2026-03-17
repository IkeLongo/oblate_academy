// app/resources/[resourceType]/page.tsx
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import {
  resourcesByCategorySlugQuery,
  resourcesByCollectionSlugQuery,
  resourcesByTagQuery,
  resourceTypeResolverQuery,
} from "@/sanity/lib/queries/resourceListingQueries";

import { resourceHubLabelBySlugQuery } from "@/sanity/lib/queries/resourceHubQueries";

import { ResourceGradeToggle } from "@/app/ui/components/input/ResourceGradeToggle";
import { Label } from "@/app/ui/components/input/Label";
import { LabelInputContainer } from "@/app/ui/components/input/LabelInputContainer";
import { ResourceFocusCards } from "@/app/ui/components/resources/ResourceFocusCards";

import type { GradeKey } from "@/app/types";

function toResourceGrade(grade: string | undefined): "k2" | "g3_5" {
  // resource schema uses: k2 / g3_5 / all
  // UI uses: gk_2 / g3_5
  if (grade === "g3_5") return "g3_5";
  return "k2";
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ResourceTypePage({
  params,
  searchParams,
}: {
  params: { resourceType: string };
  searchParams: { grade?: GradeKey };
}) {
  const resourceType = params.resourceType;

  const uiGrade: GradeKey = searchParams.grade === "g3_5" ? "g3_5" : "gk_2";
  const resourceGrade = toResourceGrade(uiGrade);

  // 1) Resolve whether this slug is a category or a collection (or neither)
  const resolved = await sanityFetch({
    query: resourceTypeResolverQuery,
    params: { slug: resourceType },
  });

  const isCategory = !!resolved.data?.category?._id;
  const isCollection = !!resolved.data?.collection?._id;

  // 2) Fetch resources based on what it resolves to
  let data: any[] = [];

  if (isCategory) {
    const res = await sanityFetch({
      query: resourcesByCategorySlugQuery,
      params: { grade: resourceGrade, categorySlug: resourceType },
    });
    data = res.data || [];
    console.log("Fetched resources by category:", data);
  } else if (isCollection) {
    const res = await sanityFetch({
      query: resourcesByCollectionSlugQuery,
      params: { grade: resourceGrade, collectionSlug: resourceType },
    });
    data = res.data || [];
    console.log("Fetched resources by collection:", data);
  } else {
    // Optional fallback: treat unknown slugs as tags.
    // If you prefer strict routing, replace this block with: notFound();
    const res = await sanityFetch({
      query: resourcesByTagQuery,
      params: { grade: resourceGrade, tag: resourceType },
    });
    data = res.data || [];
    console.log("Fetched resources by tag:", data);
  }

  const hubLabelRes = await sanityFetch({
    query: resourceHubLabelBySlugQuery,
    params: { slug: resourceType },
  });

  const hubLabel = hubLabelRes.data?.label as string | undefined;

  const pageTitle =
    hubLabel ||
    resolved.data?.category?.title ||
    resolved.data?.collection?.title ||
    titleFromSlug(resourceType);

  return (
    <div className="base bg-linear-to-br from-[#EFF6FF] to-[#F0FDF4] mx-auto py-20 md:pt-10">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{pageTitle}</h1>
            <p className="mt-2 text-slate-600">Choose a grade level to view resources.</p>
          </div>

          <div className="w-full max-w-xs mt-6">
            <LabelInputContainer>
              <Label htmlFor="grade">Select grade level</Label>
              <ResourceGradeToggle defaultGrade={uiGrade} />
            </LabelInputContainer>
          </div>
        </div>

        <div className="mt-6">
          {data.length === 0 ? (
            <div className="rounded-2xl border bg-white p-8 text-slate-600">
              No resources yet for this grade. Check back soon.
            </div>
          ) : (
            <ResourceFocusCards resources={data} />
          )}
        </div>
      </section>
    </div>
  );
}
