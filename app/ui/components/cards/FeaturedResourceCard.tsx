import { cn, getResourceDisplayTitle, getRichTextExcerpt } from "@/app/lib/utils";
import type { Resource } from "@/app/types";
import { ResourceMedia } from "@/app/ui/components/resources/ResourceMedia";

type Props = {
  resource: Resource;
  featuredTitle?: string | null;
  description?: string | null;
  // "feature" is the single-item editorial layout; "stacked" is used for 2 and 3 items.
  layout: "feature" | "stacked";
  // Third card of a 3-item set: spans both columns at md, so it goes horizontal there.
  wideAtMd?: boolean;
  onOpen: () => void;
  className?: string;
};

export function FeaturedResourceCard({
  resource,
  featuredTitle,
  description,
  layout,
  wideAtMd = false,
  onOpen,
  className,
}: Props) {
  const title = featuredTitle?.trim() || getResourceDisplayTitle(resource);
  const isFeature = layout === "feature";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border-4 border-blue-100 bg-white shadow-sm",
        "cursor-pointer transition-shadow hover:shadow-md",
        "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-sky-200",
        isFeature && "md:flex-row",
        wideAtMd && "md:flex-row lg:flex-col",
        className
      )}
    >
      {/* Decorative preview only: the CTA button is the single interactive control */}
      <div
        inert
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-slate-100",
          isFeature && "md:aspect-auto md:min-h-[26rem] md:w-1/2 md:shrink-0",
          wideAtMd && "md:aspect-auto md:min-h-72 md:w-1/2 md:shrink-0 lg:aspect-[4/3] lg:min-h-0 lg:w-full"
        )}
      >
        <ResourceMedia
          id={resource._id}
          kind={resource.kind}
          label={title}
          image={resource.image}
          pdfThumbnail={resource.pdfThumbnail}
          url={resource.url}
          muxPlaybackId={resource.muxVideo?.asset?.playbackId}
          excerpt={resource.kind === "richText" ? getRichTextExcerpt(resource.body) : undefined}
          linkHeightClass="h-full"
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-6 md:p-8", isFeature && "md:justify-center")}>
        <h3 className={cn("font-extrabold text-blue-400", isFeature && "md:text-4xl")}>{title}</h3>

        {description && (
          <p className={cn("mt-3 leading-relaxed text-black-300", isFeature ? "text-lg" : "text-base")}>
            {description}
          </p>
        )}

        <div className={cn(isFeature ? "mt-6" : "mt-auto pt-5")}>
          {/* The ::after overlay makes the whole card clickable through this one button */}
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Explore Resource: ${title}`}
            className="inline-flex items-center rounded-full bg-[#067099] px-6 py-2.5 font-poppins text-sm font-extrabold uppercase tracking-wide text-white transition-colors after:absolute after:inset-0 group-hover:bg-[#085E7C] focus-visible:outline-none"
          >
            Explore Resource
          </button>
        </div>
      </div>
    </article>
  );
}
