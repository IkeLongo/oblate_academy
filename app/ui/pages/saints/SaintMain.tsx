import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PortableTextComponent } from "@/app/ui/components/texts/PortableTextComponent";
import { GradeSwitcher } from "@/app/ui/components/input/GradeSwitcher";
import { urlFor } from "@/sanity/lib/image";

import type { GradeKey } from "@/app/types/types";

type Activity = {
  _id: string;
  activity: {
    slug: string;
    title: string;
    icon: string;
  };
  startColorIndex: number;
};

type SaintMainProps = {
  grade: GradeKey;
  slug: string;
  data: Record<string, any>;
};

const colorConfigs = [
  { text: "text-green-400", bg: "bg-green-400" },
  { text: "text-blue-300", bg: "bg-blue-300" },
  { text: "text-red-400", bg: "bg-red-400" },
];

export function SaintMain({ grade, slug, data }: SaintMainProps) {
  const imageUrl = data.cardImage
    ? urlFor(data.cardImage).width(600).height(600).fit("crop").url()
    : "";

  return (
    <div className="base bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200 mx-auto px-6 py-20 md:pt-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8 max-w-6xl mx-auto pt-16 md:pt-0">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400">
          ← Back to Home
        </Link>
        <div className="text-blue-300 font-extrabold min-w-none md:min-w-sm md:static md:mt-0 mt-2">
          <GradeSwitcher
            grade={grade}
            slug={slug}
            basePath="saints"
            enabledGrades={{
              k2: data.enableK2,
              g3_5: data.enableG35,
            }}
          />
        </div>
      </div>
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-blue-300">
        {data.overviewTitle}
      </h1>

      <div className="mt-10 bg-white/70 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start max-w-lg md:max-w-5xl mx-auto">
        <div className="w-full flex justify-center md:shrink-0 md:w-auto">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={data.cardImage?.alt || data.name}
              width={320}
              height={320}
              className="rounded-2xl object-cover w-full max-w-xs md:w-[320px] md:max-w-none"
              priority
            />
          )}
        </div>

        <div className="max-w-none">
          <PortableText
            value={data.overview || []}
            components={PortableTextComponent}
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between md:justify-center gap-8 max-w-lg md:max-w-none flex-wrap mx-auto">
        {data.activities.map((r: Activity, i: number) => {
          const href = `/${grade}/saints/${data.slug}/${r.activity.slug}`;
          const color = colorConfigs[i % colorConfigs.length];
          return (
            <Link
              key={r._id}
              href={href}
              className={`w-full md:w-[200px] rounded-2xl overflow-hidden shadow-sm border border-transparent hover:shadow-md transition`}
            >
              <div className={`h-44 md:h-32 flex items-center justify-center ${color.bg}`}>
                {r.activity.icon && (
                  <Image
                    src={urlFor(r.activity.icon).width(64).height(64).fit("crop").url()}
                    alt={r.activity.title + " icon"}
                    width={64}
                    height={64}
                    className="mx-auto mb-2"
                  />
                )}
              </div>
              <div className={`bg-white py-3 text-center font-inria font-extrabold text-xl ${color.text}`}>
                {r.activity.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
