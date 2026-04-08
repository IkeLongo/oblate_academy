/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { components } from "@/app/ui/components/texts/PortableTextComponent";
import { HubIcon } from "@/app/ui/components/resources/hubIcons";
import { ResourcesGrid } from "./ResourcesGrid";
import { DownloadAllButton } from "./DownloadAllButton";
import { getKitPalette } from "@/app/lib/kitPalette";

type Highlight = {
  text: string;
  icon?: string;
};

type IncludedItem = {
  text: string;
};

type Resource = {
  _id: string;
  title: string;
  slug: string;
  kind?: string;
  body?: any[];
  image?: any;
  pdfUrl?: string;
};

type FocusRef = {
  name: string;
  slug: string;
};

type CoverImage = {
  url?: string;
};

type FeaturedResourceKitData = {
  _id: string;
  title: string;
  description: string;
  ctaLabel?: string;
  monthLabel?: string;
  intro?: any[];
  colorTheme?: string;
  highlights?: Highlight[];
  includedItems?: IncludedItem[];
  coverImage?: CoverImage;
  focusType?: "saint" | "virtue";
  saint?: FocusRef;
  virtue?: FocusRef;
  resources?: Resource[];
};

type Props = {
  data: FeaturedResourceKitData;
};

export function FeaturedResourceKitMain({ data }: Props) {
  const focusRef = data.focusType === "saint" ? data.saint : data.virtue;
  const focusBasePath = data.focusType === "saint"
    ? "grade/k-2/saints"
    : "grade/k-2/virtues";
  const palette = getKitPalette(data.colorTheme);

  return (
    <div
      className="base mx-auto px-6 py-20 navdesk:pt-10"
      style={{ background: `linear-gradient(to bottom, ${palette.pageBg}, #f9fafb, ${palette.pageBg})` }}
    >
      <div className="mx-auto max-w-5xl pt-16 navdesk:pt-0">

        {/* BACK LINK */}
        <div className="mb-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-75"
            style={{ color: palette.accent }}
          >
            ← Back to Resources
          </Link>
        </div>

        {/* HEADER */}
        <div className="text-center">
          {data.monthLabel && (
            <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: palette.accent }}>
              {data.monthLabel}
            </p>
          )}
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold" style={{ color: palette.heading }}>
            {data.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {data.description}
          </p>
        </div>

        {/* FOCUS LINK (saint or virtue) */}
        {focusRef && (
          <div className="mt-4 text-center">
            <Link
              href={`/${focusBasePath}/${focusRef.slug}`}
              className="text-sm font-medium underline underline-offset-2 transition hover:opacity-75"
              style={{ color: palette.body }}
            >
              Learn more about {focusRef.name} →
            </Link>
          </div>
        )}

        {/* MAIN CARD */}
        <div className="mt-10 bg-white/70 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-stretch">

          {/* LEFT: cover image */}
          {data.coverImage?.url && (
            <div className="w-full md:w-[320px] md:shrink-0 flex flex-col gap-6 items-center">
              <Image
                src={data.coverImage.url}
                alt={data.title}
                width={320}
                height={450}
                className="rounded-2xl object-cover w-full md:w-[320px] h-[400px] md:h-[450px]"
                priority
              />
            </div>
          )}

          {/* RIGHT: intro / bio */}
          <div className="w-full flex flex-col overflow-y-auto md:pr-2 max-h-[450px]">
            {data.intro && data.intro.length > 0 ? (
              <PortableText value={data.intro} components={components} />
            ) : (
              <p className="text-slate-500">No introduction available.</p>
            )}
          </div>
        </div>

        {/* HIGHLIGHTS */}
        {(data.highlights?.length ?? 0) > 0 && (
          <div className="mt-12 bg-white/70 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold" style={{ color: palette.heading }}>
              What You&apos;ll Learn
            </h2>
            <ul className="mt-4 space-y-3 text-lg">
              {data.highlights!.map((item, idx) => (
                <li
                  key={`${item.text}-${idx}`}
                  className="flex items-start gap-3 text-[1.05rem]"
                  style={{ color: palette.accent }}
                >
                  <span className="mt-1" style={{ color: palette.accent }}>
                    <HubIcon iconKey={item.icon || "smile"} className="h-4 w-4 shrink-0" />
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* INCLUDED ITEMS */}
        {(data.includedItems?.length ?? 0) > 0 && (
          <div className="mt-8 rounded-2xl p-6 md:p-8" style={{ backgroundColor: palette.bgSoft }}>
            <h3 className="text-xl font-bold" style={{ color: palette.heading }}>
              What&apos;s Included
            </h3>
            <ul className="mt-4 space-y-2 text-lg" style={{ color: palette.body }}>
              {data.includedItems!.map((item, idx) => (
                <li key={idx}>• {item.text}</li>
              ))}
            </ul>
          </div>
        )}

        {/* RESOURCES GRID */}
        {(data.resources?.length ?? 0) > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold text-slate-800">
              Included Resources
            </h2>
            <ResourcesGrid resources={data.resources!} accentColor={palette.accent} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <DownloadAllButton
            resources={data.resources ?? []}
            label={data.ctaLabel || "Download All Resources"}
            buttonColor={palette.button}
            buttonHoverColor={palette.buttonHover}
          />
        </div>

      </div>
    </div>
  );
}
