// app/resources/[resourceType]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import {
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
  if (grade === "g3_5") return "g3_5";
  return "k2";
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ resourceType: string }>;
}): Promise<Metadata> {
  const { resourceType } = await params;
  const title = titleFromSlug(resourceType);
  return {
    title,
    description: `Browse ${title} resources from Oblate Academy for Catholic education.`,
    openGraph: { title: `${title} | Oblate Academy` },
    alternates: { canonical: `/resources/${resourceType}` },
  };
}

export default async function ResourceTypePage({
  params,
  searchParams,
}: {
  params: Promise<{ resourceType: string }>;
  searchParams: Promise<{ grade?: GradeKey }>;
}) {
  const { resourceType } = await params;
  const { grade } = await searchParams;

  const uiGrade: GradeKey = grade === "g3_5" ? "g3_5" : "gk_2";
  const resourceGrade = toResourceGrade(uiGrade);

  // 1) Resolve whether this slug is a collection
  const resolved = await sanityFetch({
    query: resourceTypeResolverQuery,
    params: { slug: resourceType },
  });

  const isCollection = !!resolved.data?.collection?._id;

  // 2) Fetch resources — by collection first, tag fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any[] = [];

  if (isCollection) {
    const res = await sanityFetch({
      query: resourcesByCollectionSlugQuery,
      params: { grade: resourceGrade, collectionSlug: resourceType },
    });
    data = res.data || [];
  } else {
    // Fallback: treat unknown slugs as tags
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await (sanityFetch as any)({
      query: resourcesByTagQuery,
      params: { grade: resourceGrade, tag: resourceType },
    });
    data = res.data || [];
  }

  const hubLabelRes = await sanityFetch({
    query: resourceHubLabelBySlugQuery,
    params: { slug: resourceType },
  });

  const hubLabel = hubLabelRes.data?.label as string | undefined;

  const pageTitle =
    hubLabel ||
    resolved.data?.collection?.title ||
    titleFromSlug(resourceType);

  return (
    <div className="base bg-linear-to-br from-[#EFF6FF] to-[#F0FDF4] mx-auto py-20 navdesk:pt-10">
      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* BACK LINK */}
        <div className="mb-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
          >
            ← Back to Resources
          </Link>
        </div>

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