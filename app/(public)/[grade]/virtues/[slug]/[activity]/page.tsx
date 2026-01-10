// app/(public)/[grade]/virtues/[slug]/[activity]/page.tsx
import { notFound } from "next/navigation";
import { fetchVirtueActivityPage } from "@/sanity/lib/fetch/fetchVirtuePage";
import { ActivityTopControls } from "@/app/ui/components/buttons/ActivityTopControls";
import { GradeKey } from "@/app/types/types";

export default async function VirtueActivityPage({
  params,
}: {
  params: Promise<{ grade: string; slug: string; activity: string }>;
}) {
  const { grade, slug, activity } = await params;

  if (grade !== "k2" && grade !== "g3_5") notFound();

  const data = await fetchVirtueActivityPage({
    grade: grade as GradeKey,
    slug,
    activity,
  });

  if (!data?.resource?.pdfUrl) notFound();

  const chipText = "Worksheets & Activities";
  const activityTitle = data.resource.activity?.title ?? "Activity";
  const pageTitle = `${activityTitle} — ${data.name}`;

  return (
    <div className="base min-h-screen relative pt-28 md:pt-16 pb-16">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/cloud-backdrop.webp)" }}
      />
      <div className="absolute inset-0 bg-white/20" />

      {/* Top controls */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-6">
        <ActivityTopControls
          grade={grade}
          slug={slug}
          basePath="virtues"
          pdfUrl={data.resource.pdfUrl}
        />

        <div className="mt-10 flex flex-col items-start gap-10">
          {/* Chip */}
          <div className="inline-flex items-center rounded-full bg-white/70 px-2 py-1 shadow-sm border border-white/40 text-xs">
            <span className="text-blue-400 font-extrabold tracking-wide">
              {chipText}
            </span>
            <span className="mx-2 h-3 w-px bg-blue-200/70" />
            <span className="text-blue-300 font-extrabold">
              {grade === "k2" ? "Kinder–2nd" : "3rd–5th"}
            </span>
          </div>

          {/* H1 */}
          <h1 className="mt-5 font-extrabold text-blue-300 text-3xl md:text-4xl w-full text-center">
            {pageTitle}
          </h1>
        </div>

        {/* PDF frame */}
        <div className="w-full max-w-[520px] aspect-[8/11] mt-8 mx-auto">
          <div className="rounded-md bg-white shadow-xl border border-black/10 overflow-hidden w-full h-full">
            <iframe
              src={data.resource.pdfUrl}
              className="w-full h-full"
              title={`${data.name} — ${data.resource.activity?.title ?? "Activity"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
