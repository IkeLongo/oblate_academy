// app/ui/pages/home/GradeContent.tsx

import React from "react";
import { fetchRowCards, GradeKey } from "@/sanity/lib/fetch/fetchRowCards";
import {urlFor} from "@/sanity/lib/image";
import { ContentRow, ContentCardModel } from "@/app/ui/components/ContentRow";

function gradePrefix(grade: GradeKey) {
  return grade === "k2" ? "/k2" : "/g3-5";
}

export default async function GradeContent({ grade }: { grade: GradeKey }) {
  const { saints, virtues } = await fetchRowCards(grade);

  const saintsCards: ContentCardModel[] = saints.map((s) => ({
    title: s.name,
    href: `${gradePrefix(grade)}/saints/${s.slug}`,
    imageSrc: urlFor(s.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    // imageSrc: s.cardImage.src,
    imageAlt: s.cardImage.alt || s.name,
  }));

  const virtuesCards: ContentCardModel[] = virtues.map((v) => ({
    title: v.name,
    href: `${gradePrefix(grade)}/virtues/${v.slug}`,
    imageSrc: urlFor(v.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    // imageSrc: v.cardImage.src,
    imageAlt: v.cardImage.alt || v.name,
  }));

  return (
    <div className="base bg-gray-100 relative pb-16">
      <img
        src="/cloud-border-white.webp"
        alt="Cloud border"
        className="absolute -top-10 left-1/2 -translate-x-1/2 min-w-[110vw] h-auto pointer-events-none select-none z-10"
      />
      <section className="space-y-16 bg-gray-100 relative z-20">
        <ContentRow title="Meet the Saints" cards={saintsCards} startColorIndex={0} />
        <ContentRow title="Grow in Virtues" cards={virtuesCards} startColorIndex={3} />
      </section>
    </div>
  );
}
