import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { virtuesRowCardsQuery } from "@/sanity/lib/queries/queries";
import { urlFor } from "@/sanity/lib/image";
import { ContentRow } from "@/app/ui/pages/home/ContentRow";
import type { ContentCardModel, Virtue } from "@/app/types";

export default async function VirtuesShowcase() {
  const { data: virtues } = await sanityFetch({
    query: virtuesRowCardsQuery,
    params: { grade: "gk_2" },
  });

  const cards: ContentCardModel[] = (virtues as Virtue[]).map((v) => ({
    title: v.name,
    href: `/grade/k-2/virtues/${v.slug}`,
    imageSrc: urlFor(v.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    imageAlt: v.cardImage.alt ?? v.name,
  }));

  if (!cards.length) return null;

  return (
    <section className="bg-blue-100 overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-end justify-between gap-4 flex-wrap">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            Learn Virtue
          </p>
          <Link
            href="/resources"
            className="text-sm font-poppins font-semibold text-blue-300 hover:text-blue-400 underline underline-offset-2"
          >
            View all virtues →
          </Link>
        </div>
        <ContentRow title="Virtues for Kinder – 2nd Grade" cards={cards} startColorIndex={0} />
      </div>
    </section>
  );
}
