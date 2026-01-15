import RelatedContentSection from "../../shared/sections/RelatedContentSection";

import type { ImageAsset } from '@sanity/types';

type SaintItem = {
  _id: string;
  name: string;
  slug: string;
  cardImage?: { asset?: ImageAsset; alt?: string };
};

type Props = {
  gradeHref: "k-2" | "3-5";
  saints: SaintItem[];
  title?: string;
  className?: string;
};

const saintsTheme = {
  sectionBg: "bg-red-150",
  headingText: "text-red-600",
  cardColors: [
    { text: "text-green-500", border: "border-green-500", bg: "bg-green-200" },
    { text: "text-yellow-700", border: "border-yellow-700", bg: "bg-yellow-100" },
    { text: "text-blue-300", border: "border-blue-300", bg: "bg-blue-100" }, // to mimic outer/middle/outer
  ],
};

export default function RelatedSaints({
  gradeHref,
  saints,
  title = "Related Saints",
  className = "",
}: Props) {
  if (!saints || saints.length === 0) return null;
  return (
    <RelatedContentSection
      gradeHref={gradeHref}
      basePath="saints"
      items={saints}
      title={title}
      className={className}
      theme={saintsTheme}
      limit={3}
    />
  );
}
