import { fetchRowCards } from "@/sanity/lib/fetch/fetchRowCards";
import { urlFor } from "@/sanity/lib/image";
import GradeContentClient from "./client/GradeContentClient";
import type { GradeKey, ContentCardModel, Saint, Virtue } from "@/app/types/types";

function gradePrefix(grade: GradeKey) {
  return grade === "k2" ? "/k2" : "/g3-5";
}

function toCards(
  grade: GradeKey,
  saints: Saint[],
  virtues: Virtue[]
): { saintsCards: ContentCardModel[]; virtuesCards: ContentCardModel[] } {
  const saintsCards = saints.map((s) => ({
    title: s.name,
    href: `${gradePrefix(grade)}/saints/${s.slug}`,
    imageSrc: urlFor(s.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    imageAlt: s.cardImage.alt || s.name,
  }));

  const virtuesCards = virtues.map((v) => ({
    title: v.name,
    href: `${gradePrefix(grade)}/virtues/${v.slug}`,
    imageSrc: urlFor(v.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    imageAlt: v.cardImage.alt || v.name,
  }));

  return { saintsCards, virtuesCards };
}

export default async function GradeContentSection() {
  const [k2, g35] = await Promise.all([fetchRowCards("k2"), fetchRowCards("g3_5")]);

  const k2Cards = toCards("k2", k2.saints, k2.virtues);
  const g35Cards = toCards("g3_5", g35.saints, g35.virtues);

  const dataByGrade = {
    k2: k2Cards,
    g3_5: g35Cards,
  };

  const gradeOptions: { value: GradeKey; label: string }[] = [
    { value: "k2", label: "Kinder - 2nd Grade" },
    { value: "g3_5", label: "3rd - 5th Grade" },
  ];

  return <GradeContentClient initialGrade="k2" options={gradeOptions} dataByGrade={dataByGrade} />;
}
