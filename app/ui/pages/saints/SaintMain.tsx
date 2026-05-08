import Image from "next/image";
import Link from "next/link";
// import { PortableText } from "@portabletext/react";
import { PortableText } from "next-sanity";
import { components } from "@/app/ui/components/texts/PortableTextComponent";
import { GradeSwitcher } from "@/app/ui/components/input/GradeSwitcher";
import { ResourceFocusCards } from "@/app/ui/components/resources/ResourceFocusCards";
import { urlFor } from "@/sanity/lib/image";
import { HubHeader } from "@/app/ui/components/nav/HubHeader";
import { getResourceDisplayTitle } from "@/app/lib/utils";
import type { GradeKey, GradeKeyLink, PageData } from "@/app/types";

type SaintMainProps = {
  grade: GradeKey;          // for GradeSwitcher etc
  gradeHref: GradeKeyLink;  // ✅ for URLs: "k-2" | "3-5"
  slug: string;
  data: PageData;
};

export function SaintMain({ grade, gradeHref, slug, data }: SaintMainProps) {
  const imageUrl = data.cardImage ? urlFor(data.cardImage).url() : "";

  return (
    <div className="base bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200 mx-auto px-6 py-20 pt-10 pt-10">
      <div className="max-w-lg md:max-w-6xl mx-auto">
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8 pt-12 navdesk:pt-0">
          <Link
            href={`/grade/${gradeHref}/saints`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400"
          >
            ← Back to Saints
          </Link>
          <div className="text-blue-300 font-extrabold min-w-none md:min-w-sm md:static md:mt-0 mt-2">
            <GradeSwitcher
              grade={grade}
              slug={slug}
              basePath="saints"
              enabledGrades={{
                "gk_2": data.enableGradeK_2 ?? true,
                "g3_5": data.enableGrade3_5 ?? true,
              }}
            />
          </div>
        </div>
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-blue-300">
          {data.overviewTitle}
        </h1> */}

        <HubHeader
          grade={grade}
          eyebrow="Say Hello To"
          title={data.overviewTitle}
        />

        <div className="mt-4 navdesk:mt-10 bg-white/70 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-stretch">
          {/* LEFT: fixed height on md so RIGHT can match it */}
          <div className="w-full md:w-[320px] md:shrink-0 flex flex-col gap-6 items-center md:items-start md:h-[540px]">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={data.cardImage?.alt || data.name}
                width={320}
                height={450}
                className="rounded-2xl object-cover object-top w-full md:w-[320px] h-[400px] md:h-[450px]"
                priority
              />
            )}

            {/* Push feast day to bottom of the left column on md */}
            <div className="w-full bg-blue-100 rounded-lg px-4 py-2 md:mt-auto">
              <p className="text-xl font-bold text-blue-400">
                Feast Day: {data.feastDay}
              </p>
            </div>
          </div>

          {/* RIGHT: matches LEFT height on md; scrolls when content is longer */}
          <div className="w-full flex flex-col h-[400px] md:h-[540px] overflow-y-auto md:pr-2">
            <PortableText value={data.overview || []} components={components} />
          </div>
        </div>

        <div className="mt-12 w-full">
          {(!data.resources || data.resources.length === 0) ? (
            <div className="w-full text-center text-slate-500 py-8">No resources available for this grade.</div>
          ) : (
            <ResourceFocusCards
              resources={data.resources.map(r => ({
                ...r,
                title: getResourceDisplayTitle(r),
              }))}
              showFilter={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
