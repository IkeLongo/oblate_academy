// app/(public)/[grade]/virtues/[slug]/[category]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";

import { CategoryTopControls } from "@/app/ui/components/buttons/CategoryTopControls";
import { sanityFetch } from "@/sanity/lib/live";
import { virtuePageQuery } from "@/sanity/lib/queries/virtuePageQueries";
import { urlFor } from "@/sanity/lib/image";
import type { Resource } from "@/app/types/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ grade: string; slug: string; category: string }>;
}): Promise<Metadata> {
  const { slug, category } = await params;
  const data = await client.fetch<{ name: string } | null>(
    `*[_type == "virtue" && slug.current == $slug][0]{ name }`,
    { slug }
  );
  const name = data?.name ?? slug;
  const categoryTitle = category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${name} — ${categoryTitle}`,
    description: `${categoryTitle} resources for the virtue of ${name} — Catholic activities for children.`,
    openGraph: { title: `${name} — ${categoryTitle} | Oblate Academy` },
  };
}

export default async function VirtueCategoryPage({
  params,
}: {
  params: Promise<{ grade: string; slug: string; category: string }>;
}) {
  const { grade, slug, category } = await params;
  if (grade !== "k-2" && grade !== "3-5") notFound();

  const isDraft = (await draftMode()).isEnabled;
  const resourceGrade = grade === "k-2" ? "k2" : "g3_5";

  // Fetch all resources for the virtue (single query)
  const { data } = await sanityFetch({
    query: virtuePageQuery,
    params: { slug, grade: resourceGrade, resourceGrade, isDraft },
  });

  // Find the resource matching the category param
  const resource = (data?.resources as Resource[] | undefined)?.find(
    (r: Resource) => r.category?.slug === category
  );

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
    ((resource.kind === "link" || resource.kind === "video") && !resource.url) ||
    (resource.kind === "richText" && (!resource.body || (Array.isArray(resource.body) && resource.body.length === 0)));

  const chipText = "Worksheets & Activities";
  const categoryTitle = resource.category?.title ?? "Activity";
  const pageTitle = `${categoryTitle} — ${data?.name ?? ""}`;

  return (
    <div className="base min-h-screen relative pt-28 md:pt-16 pb-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/swirls-backdrop.webp)" }}
      />
      <div className="absolute inset-0 bg-white/20" />

      {/* Top controls */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-6">
        <CategoryTopControls
          grade={grade}
          slug={slug}
          basePath="virtues"
          resource={{
            kind: resource.kind,
            url: resource.url ?? "",
            pdfUrl: resource.pdfUrl ?? "",
            imageUrl: resource.image ? urlFor(resource.image).width(1200).quality(80).url() : undefined,
            title: pageTitle,
          }}
        />

        <div className="mt-10 flex flex-col items-start gap-10">
          {/* Chip */}
          <div className="inline-flex items-center rounded-full bg-white/90 px-2 py-1 shadow-sm border border-white/40 text-xs">
            <span className="text-blue-400 font-extrabold tracking-wide">
              {chipText}
            </span>
            <span className="mx-2 h-3 w-px bg-blue-200/70" />
            <span className="text-blue-300 font-extrabold">
              {grade === "k-2" ? "Kinder–2nd" : "3rd–5th"}
            </span>
          </div>

          {/* H1 */}
          <h1 className="mt-5 font-extrabold text-blue-500 text-3xl md:text-4xl w-full text-center">
            {pageTitle}
          </h1>
        </div>

        {/* Content */}
        <div className="w-full max-w-[520px] aspect-[8/11] mt-8 mx-auto">
          <div className="rounded-md bg-white shadow-xl border border-black/10 overflow-hidden w-full h-full">
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
                    className="w-full h-full"
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

                {/* LINK / VIDEO */}
                {(resource.kind === "link" || resource.kind === "video") && resource.url && (
                  <div className="p-6">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-bold underline"
                    >
                      Open {resource.kind === "video" ? "video" : "link"}
                    </a>
                  </div>
                )}

                {/* RICH TEXT */}
                {(resource.kind === "richText" && (!resource.body || (Array.isArray(resource.body) && resource.body.length === 0))) && (
                  <div className="p-6">
                    {/* Uncomment if you want to render PortableText */}
                    {/* <PortableText value={resource.body} components={PortableTextComponent} /> */}
                    <p className="text-slate-700">
                      (Render rich text here)
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
