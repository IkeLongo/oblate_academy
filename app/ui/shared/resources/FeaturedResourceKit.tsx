import Link from "next/link";
import { Download, FileText, Printer, Video } from "lucide-react";

type KitItem = {
  text: string;
  icon?: "lesson" | "printable" | "video";
};

type IncludedItem = {
  text: string;
};

type FeaturedResourceKitProps = {
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel?: string;
  highlights?: KitItem[];
  includedItems?: IncludedItem[];
};

function getHighlightIcon(icon?: KitItem["icon"]) {
  switch (icon) {
    case "lesson":
      return <Download className="h-4 w-4 shrink-0" />;
    case "printable":
      return <FileText className="h-4 w-4 shrink-0" />;
    case "video":
      return <Video className="h-4 w-4 shrink-0" />;
    default:
      return <Printer className="h-4 w-4 shrink-0" />;
  }
}

export default function FeaturedResourceKit({
  title,
  description,
  ctaHref,
  ctaLabel = "Download Complete Kit",
  highlights = [],
  includedItems = [],
}: FeaturedResourceKitProps) {
  return (
    <section className="bg-[#f6f6f6] px-6 py-16 md:px-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl font-fredoka tracking-wide">
            Featured Resource of the Month
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Complete guide to teaching about saints, virtues, and meaningful traditions.
          </p>
        </div>

        <div className="mt-10 rounded-[24px] border border-[#d9d3cf] bg-gradient-to-r from-[#f6eceb] to-[#e6f3ea] p-6 shadow-sm md:p-8 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.95fr]">
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-[#0c7a3b]">
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
                      className="flex items-start gap-3 text-[1.05rem] text-[#168647]"
                    >
                      <span className="mt-1 text-[#168647]">
                        {getHighlightIcon(item.icon)}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-3 rounded-xl bg-[#09b23f] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:scale-[1.01] hover:bg-[#089a38]"
                >
                  <Download className="h-4 w-4" />
                  <span>{ctaLabel}</span>
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[18px] bg-white p-6 shadow-[0_12px_24px_rgba(15,23,42,0.10)]">
              <div className="rounded-[14px] bg-[#cfeeda] px-6 py-5 text-center">
                <h4 className="text-2xl font-bold text-[#0c7a3b]">
                  What&apos;s Included:
                </h4>

                {includedItems.length > 0 && (
                  <ul className="mt-4 space-y-2 text-lg text-[#138042]">
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