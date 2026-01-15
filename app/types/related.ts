import type { SanityImage } from "./sanity";

export type RelatedVirtuesSectionProps = {
  gradeHref: "k-2" | "3-5";
  virtues: Array<{
    _id: string;
    name: string;
    slug: string;
    cardImage?: SanityImage;
    imageSrc?: string;
  }>;
  title?: string;
  className?: string;
};
