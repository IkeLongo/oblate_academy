// app/[grade]/saints/[slug]/[category]/page.tsx

import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { sanityFetch } from "@/sanity/lib/live";
import { saintCategoryPageQuery } from "@/sanity/lib/queries/saintPageQueries";
import { CategoryTopControls } from "@/app/ui/components/buttons/CategoryTopControls";
import { urlFor } from "@/sanity/lib/image";
import { isGradeLink, toGradeKey } from "@/app/types";
import { PortableText } from "next-sanity";
import { components } from "@/app/ui/components/texts/PortableTextComponent";
import { AutoplayMuxVideo } from "@/app/ui/components/videos/AutoPlayMux";

import type { Resource } from "@/app/types/pages";
type PageProps = {
  params: Promise<{ grade: string; slug: string; category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grade, slug, category } = await params;
  const [saintData, resourceData] = await Promise.all([
    client.fetch<{ name: string } | null>(
      `*[_type == "saint" && slug.current == $slug][0]{ name }`,
      { slug }
    ),
    client.fetch<{ categoryTitle: string } | null>(
      `*[_type == "resource" && _id == $resourceId][0]{ "categoryTitle": category->title }`,
      { resourceId: category }
    ),
  ]);
  const name = saintData?.name ?? slug;
  const categoryTitle = resourceData?.categoryTitle ?? "Activity";
  return {
    title: `${name} — ${categoryTitle}`,
    description: `${categoryTitle} resources for Saint ${name} — Catholic activities for children.`,
    openGraph: { title: `${name} — ${categoryTitle} | Oblate Academy` },
    alternates: { canonical: `/grade/${grade}/saints/${slug}/${category}` },
  };
}

export default async function SaintCategoryPage({ params }: PageProps) {
  const { grade, slug, category } = await params;
  if (!isGradeLink(grade)) notFound();

  const gradeKey = toGradeKey(grade);
  const isDraft = (await draftMode()).isEnabled;

  const resourceGrade = gradeKey === "gk_2" ? "k2" : "g3_5";

  const { data } = await sanityFetch({
    query: saintCategoryPageQuery,
    params: { slug, grade: gradeKey, resourceGrade, isDraft }
  });

  // 🔍 Debug: Log the full data response
  // console.log('🔍 Category Page Debug:', {
  //   slug,
  //   gradeKey,
  //   resourceGrade,
  //   hasData: !!data,
  //   resourceCount: data?.resources?.length ?? 0,
  //   resources: data?.resources
  // });

  // Find the resource by its unique _id (the URL segment is now the resource _id)
  const resource = (data?.resources as Resource[] | undefined)?.find(
    (r: Resource) => r._id === category
  );

  // 🔍 Debug: Log resource details
  // console.log('🔍 Resource Details:', {
  //   hasResource: !!resource,
  //   kind: resource?.kind,
  //   hasImage: !!resource?.image,
  //   image: resource?.image,
  //   hasPdfUrl: !!resource?.pdfUrl,
  //   hasUrl: !!resource?.url,
  //   hasBody: !!resource?.body
  // });

  // For link kind, redirect straight to the external URL
  if (resource?.kind === "link" && resource.url) {
    redirect(resource.url);
  }

  // In preview, don't hard crash if resource is missing briefly
  if (!resource) {
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

  // If the resource exists but is missing its required content, show a friendly message (not 404)
  const isMissingContent =
    (resource.kind === "pdf" && !resource.pdfUrl) ||
    (resource.kind === "image" && !resource.image) ||
    (resource.kind === "link" && !resource.url) ||
    (resource.kind === "video" && !resource.url && !resource.muxPlaybackId) ||
    (resource.kind === "richText" && (!resource.body || resource.body.length === 0));

  const chipText = "Worksheets & Activities";
  const categoryTitle = resource.category?.title ?? "Category";
  const pageTitle =
    resource.kind === "richText"
      ? resource.title ?? categoryTitle
      : `${categoryTitle} — ${data?.name ?? ""}`;

  return (
    <div className="base min-h-screen relative pt-28 navdesk:pt-16 pb-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/cloud-backdrop.webp)" }}
      />
      <div className="absolute inset-0 bg-white/20" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-6">
        <CategoryTopControls
          grade={grade}
          slug={slug}
          basePath="saints"
          resource={{
            kind: resource.kind,
            url: resource.url ?? "",
            pdfUrl: resource.pdfUrl ?? "",
            imageUrl: resource.image ? urlFor(resource.image).width(1200).quality(80).url() : undefined, // ✅ Allowed
            title: pageTitle,
          }}
        />

        <div className="mt-10 flex flex-col items-start gap-10">
          {/* Chip */}
          <div className="inline-flex items-center rounded-full bg-white/70 px-2 py-1 shadow-sm border border-white/40 text-xs">
            <span className="text-blue-400 font-extrabold tracking-wide">
              {chipText}
            </span>
            <span className="mx-2 h-3 w-px bg-blue-200/70" />
            <span className="text-blue-300 font-extrabold">
              {grade === "k-2" ? "Kinder–2nd" : "3rd–5th"}
            </span>
          </div>

          {/* H1 */}
          <h1 className="mt-5 font-extrabold text-blue-300 text-3xl md:text-4xl w-full text-center">
            {pageTitle}
          </h1>
        </div>

        {/* Content */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-[720px]">
            <div className="rounded-md bg-white shadow-xl border border-black/10 overflow-hidden">
              {isMissingContent ? (
                <div className="p-6">
                  <p className="text-lg font-bold">This resource is missing content.</p>
                  <p className="text-sm text-slate-600 mt-1">
                    In Sanity, check the Resource document for required fields based on type:
                    <span className="font-semibold"> {resource.kind}</span>.
                  </p>
                </div>
              ) : (
                <>
                  {/* PDF */}
                  {resource.kind === "pdf" && resource.pdfUrl && (
                    <iframe
                      src={resource.pdfUrl}
                      className="w-full h-[620px]"
                      title={`${data?.name ?? ""} — ${categoryTitle}`}
                    />
                  )}

                  {/* IMAGE */}
                  {resource.kind === "image" && resource.image && (
                    <img
                      src={urlFor(resource.image).width(1200).quality(80).url()}
                      alt={
                        resource.image.alt ??
                        `Illustration for ${categoryTitle}`
                      }
                      className="w-full h-auto"
                    />
                  )}

                  {/* VIDEO — Mux player */}
                  {resource.kind === "video" && resource.muxPlaybackId && (
                    <div className="p-4">
                      <AutoplayMuxVideo
                        playbackId={resource.muxPlaybackId}
                        videoId={resource._id}
                        videoTitle={pageTitle}
                        autoPlay={false}
                        muted={false}
                        loop={false}
                        disablePointerEvents={false}
                      />
                    </div>
                  )}

                  {/* VIDEO — URL-only fallback */}
                  {resource.kind === "video" && !resource.muxPlaybackId && resource.url && (
                    <div className="p-6 flex flex-col items-center gap-3">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-bold underline"
                      >
                        Watch video
                      </a>
                    </div>
                  )}

                  {/* RICH TEXT */}
                  {resource.kind === "richText" && resource.body && Array.isArray(resource.body) && resource.body.length > 0 && (
                    <div id="print-section" className="p-6 prose max-w-none">
                      <h1>{pageTitle}</h1>
                      <PortableText value={resource.body} components={components} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
