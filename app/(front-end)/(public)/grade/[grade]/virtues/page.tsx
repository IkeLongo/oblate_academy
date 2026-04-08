import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { virtuesRowCardsQuery } from "@/sanity/lib/queries/queries";
import { urlFor } from "@/sanity/lib/image";
import { isGradeLink, toGradeKey } from "@/app/types";
import { VirtuesHub } from "@/app/ui/pages/virtues/VirtuesHub";

import type { Virtue } from "@/app/types";

type PageProps = {
  params: Promise<{ grade: string }>;
};

const GRADE_LABEL: Record<string, string> = {
  "k-2": "Kinder – 2nd Grade",
  "3-5": "3rd – 5th Grade",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { grade } = await params;
  const label = GRADE_LABEL[grade] ?? "Virtues";
  return {
    title: `Virtues for ${label} | Oblate Academy`,
    description: `Browse all virtues for ${label} — faith formation activities and stories for Catholic children.`,
    alternates: { canonical: `/grade/${grade}/virtues` },
    openGraph: {
      title: `Virtues for ${label} | Oblate Academy`,
      description: `Browse all virtues for ${label} — faith formation activities and stories for Catholic children.`,
    },
  };
}

export default async function VirtuesHubPage({ params }: PageProps) {
  const { grade } = await params;
  if (!isGradeLink(grade)) notFound();

  const gradeKey = toGradeKey(grade);

  const { data: virtues } = await sanityFetch({
    query: virtuesRowCardsQuery,
    params: { grade: gradeKey },
  });

  const cards = (virtues as Virtue[]).map((v) => ({
    title: v.name,
    href: `/grade/${grade}/virtues/${v.slug}`,
    imageSrc: urlFor(v.cardImage).width(600).height(450).fit("crop").auto("format").url(),
    imageAlt: v.cardImage.alt ?? v.name,
  }));

  return <VirtuesHub grade={gradeKey} gradeHref={grade} cards={cards} />;
}
