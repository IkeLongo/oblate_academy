import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { saintsRowCardsQuery } from "@/sanity/lib/queries/queries";
import { urlFor } from "@/sanity/lib/image";
import { ContentRow } from "@/app/ui/pages/home/ContentRow";
import type { ContentCardModel, Saint } from "@/app/types";

export default async function SaintsShowcase() {
  const { data: saints } = await sanityFetch({
    query: saintsRowCardsQuery,
    params: { grade: "gk_2" },
  });

  const cards: ContentCardModel[] = (saints as Saint[]).map((s) => ({
    title: s.name,
    href: `/grade/k-2/saints/${s.slug}`,
    imageSrc: urlFor(s.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    imageAlt: s.cardImage.alt ?? s.name,
  }));

  if (!cards.length) return null;

  return (
    <section className="bg-red-100 overflow-hidden py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 flex items-end justify-between gap-4 flex-wrap">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-red-500">
            Meet the Saints
          </p>
          <Link
            href="/resources"
            className="text-sm font-poppins font-semibold text-red-500 hover:text-red-600 underline underline-offset-2"
          >
            View all saints →
          </Link>
        </div>
        <ContentRow title="Saints for Kinder – 2nd Grade" cards={cards} startColorIndex={2} />
      </div>
    </section>
  );
}
