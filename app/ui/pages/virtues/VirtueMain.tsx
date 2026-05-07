import Image from "next/image";
import { PortableText } from "next-sanity";
import { components } from "@/app/ui/components/texts/PortableTextComponent";
import { ResourceFocusCards } from "@/app/ui/components/resources/ResourceFocusCards";
import { urlFor } from "@/sanity/lib/image";
import { HubHeader } from "@/app/ui/components/nav/HubHeader";
import type { GradeKey, GradeKeyLink, PageData } from "@/app/types";

type VirtueMainProps = {
  grade: GradeKey;
  gradeHref: GradeKeyLink;
  slug: string;
  data: PageData;
};

export function VirtueMain({ grade, gradeHref, slug, data }: VirtueMainProps) {
  const imageUrl = data.cardImage ? urlFor(data.cardImage).url() : "";

  return (
    <div className="base bg-gradient-to-b from-blue-100 via-gray-100 to-blue-100 mx-auto px-6 py-20 pt-10">
      <div className="max-w-lg md:max-w-6xl mx-auto">

        <HubHeader
          grade={grade}
          eyebrow="Grow In"
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

            {/* Virtue name badge at bottom of left column on md */}
            <div className="w-full bg-blue-100 rounded-lg px-4 py-2 md:mt-auto">
              <p className="text-xl font-bold text-blue-400">
                {data.overviewTitle}
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
                title: r.title || r.category?.title || "Resource",
              }))}
              showFilter={false}
            />
          )}
        </div>

      </div>
    </div>
  );
}
