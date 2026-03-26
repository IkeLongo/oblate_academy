
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import { HubIcon } from "@/app/ui/components/resources/hubIcons";
import { getKitPalette } from "@/app/lib/kitPalette";


export type KitItem = {
  text: string;
  icon?: string;
};

type IncludedItem = {
  text: string;
};

type FeaturedResourceKitProps = {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel?: string;
  colorTheme?: string;
  highlights?: KitItem[];
  includedItems?: IncludedItem[];
};


export function getHighlightIcon(icon?: KitItem["icon"]) {
  return <HubIcon iconKey={icon || "smile"} className="h-4 w-4 shrink-0" />;
}

export default function FeaturedResourceKit({
  title,
  description,
  ctaHref,
  ctaLabel = "View Complete Kit",
  colorTheme,
  highlights = [],
  includedItems = [],
}: FeaturedResourceKitProps) {
  const palette = getKitPalette(colorTheme);

  return (
    <section className="bg-[#FFFFFF] px-6 py-16 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* section heading always neutral */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl font-fredoka tracking-wide">
            Featured Resource of the Month
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Complete guide to teaching about saints, virtues, and meaningful traditions.
          </p>
        </div>

        {/* inject hover style for CTA button */}
        <style>{`.fkt-cta:hover{background-color:${palette.buttonHover}!important}`}</style>

        <div
          className="mt-10 rounded-[24px] border border-[#d9d3cf] p-6 shadow-sm md:p-8 lg:p-10"
          style={{ background: `linear-gradient(to right, ${palette.pageBg}, ${palette.bgSoft})` }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.95fr]">
            <div>
              <h3 className="text-3xl font-bold tracking-tight" style={{ color: palette.heading }}>
                {title}
              </h3>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
                {description}
              </p>

              {highlights.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {highlights.map((item, idx) => (
                    <li
                      key={`${item.text}-${idx}`}
                      className="flex items-start gap-3 text-[1.05rem]"
                      style={{ color: palette.accent }}
                    >
                      <span className="mt-1" style={{ color: palette.accent }}>
                        {getHighlightIcon(item.icon)}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8">
                <Link
                  href={`/resources/featured-resource-of-the-month/${ctaHref}`}
                  className="fkt-cta inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:scale-[1.01]"
                  style={{ backgroundColor: palette.button }}
                >
                  <SquareArrowOutUpRight className="h-4 w-4" />
                  <span>{ctaLabel}</span>
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[18px] bg-white p-6 shadow-[0_12px_24px_rgba(15,23,42,0.10)]">
              <div className="rounded-[14px] px-6 py-5 text-center" style={{ backgroundColor: palette.bgMedium }}>
                <h4 className="text-2xl font-bold" style={{ color: palette.heading }}>
                  What&apos;s Included:
                </h4>

                {includedItems.length > 0 && (
                  <ul className="mt-4 space-y-2 text-lg" style={{ color: palette.body }}>
                    {includedItems.map((item, idx) => (
                      <li key={`${item.text}-${idx}`}>• {item.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}