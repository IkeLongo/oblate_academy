import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { saintsRowCardsQuery } from "@/sanity/lib/queries/queries";
import { urlFor } from "@/sanity/lib/image";
import { isGradeLink, toGradeKey } from "@/app/types";
import { SaintsHub } from "@/app/ui/pages/saints/SaintsHub";

import type { Saint } from "@/app/types";

type PageProps = {
  params: Promise<{ grade: string }>;
};

const GRADE_LABEL: Record<string, string> = {
  "k-2": "Kinder – 2nd Grade",
  "3-5": "3rd – 5th Grade",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grade } = await params;
  const label = GRADE_LABEL[grade] ?? "Saints";
  return {
    title: `Saints for ${label} | Oblate Academy`,
    description: `Browse all saints for ${label} — faith stories and activities for Catholic children.`,
    alternates: { canonical: `/grade/${grade}/saints` },
    openGraph: {
      title: `Saints for ${label} | Oblate Academy`,
      description: `Browse all saints for ${label} — faith stories and activities for Catholic children.`,
    },
  };
}

export default async function SaintsHubPage({ params }: PageProps) {
  const { grade } = await params;
  if (!isGradeLink(grade)) notFound();

  const gradeKey = toGradeKey(grade);

  const { data: saints } = await sanityFetch({
    query: saintsRowCardsQuery,
    params: { grade: gradeKey },
  });

  const cards = (saints as Saint[]).map((s) => ({
    title: s.name,
    href: `/grade/${grade}/saints/${s.slug}`,
    imageSrc: urlFor(s.cardImage).width(600).height(450).fit("crop").auto("format").url(),
    imageAlt: s.cardImage.alt ?? s.name,
  }));

  return <SaintsHub grade={gradeKey} gradeHref={grade} cards={cards} />;
}
