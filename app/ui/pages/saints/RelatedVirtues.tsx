import RelatedContentSection from "../../shared/sections/RelatedContentSection";

import type { ImageAsset } from '@sanity/types';

type VirtueItem = {
  _id: string;
  name: string;
  slug: string;
  cardImage?: { asset?: ImageAsset; alt?: string };
};

type Props = {
  gradeHref: "k-2" | "3-5";
  virtues: VirtueItem[];
  title?: string;
  className?: string;
};

const virtuesTheme = {
  sectionBg: "bg-blue-100",
  headingText: "text-blue-400",
  cardColors: [
    { text: "text-red-500", border: "border-red-500", bg: "bg-red-100" },
    { text: "text-yellow-700", border: "border-yellow-700", bg: "bg-yellow-100" },
    { text: "text-green-600", border: "border-green-500", bg: "bg-green-200" }, // to mimic outer/middle/outer
  ],
};

export default function RelatedVirtues({
  gradeHref,
  virtues,
  title = "Related Virtues",
  className = "",
}: Props) {
  if (!virtues || virtues.length === 0) return null;
  return (
    <RelatedContentSection
      gradeHref={gradeHref}
      basePath="virtues"
      items={virtues}
      title={title}
      className={className}
      theme={virtuesTheme}
      limit={3}
    />
  );
}
