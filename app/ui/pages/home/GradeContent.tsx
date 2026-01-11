import { fetchRowCards } from "@/sanity/lib/fetch/fetchRowCards";
import { urlFor } from "@/sanity/lib/image";
import GradeContentClient from "./client/GradeContentClient";
import type { GradeKey, ContentCardModel, Saint, Virtue } from "@/app/types/types";

function gradePrefix(grade: GradeKey) {
  if (grade === "gk_2") return "/k-2";
  if (grade === "g3_5") return "/3-5";
  return "";
}

function toCards(
  grade: GradeKey,
  saints: Saint[],
  virtues: Virtue[]
): { saintsCards: ContentCardModel[]; virtuesCards: ContentCardModel[] } {
  const saintsCards = saints.map((s) => ({
    title: s.name,
    href: `/grade${gradePrefix(grade)}/saints/${s.slug}`,
    imageSrc: urlFor(s.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    imageAlt: s.cardImage.alt || s.name,
  }));

  const virtuesCards = virtues.map((v) => ({
    title: v.name,
    href: `/grade${gradePrefix(grade)}/virtues/${v.slug}`,
    imageSrc: urlFor(v.cardImage).width(800).height(450).fit("crop").auto("format").url(),
    imageAlt: v.cardImage.alt || v.name,
  }));

  return { saintsCards, virtuesCards };
}

export default async function GradeContentSection() {
  const [gk_2, g3_5] = await Promise.all([fetchRowCards("gk_2"), fetchRowCards("g3_5")]);

  const k2Cards = toCards("gk_2", gk_2.saints, gk_2.virtues);
  const g35Cards = toCards("g3_5", g3_5.saints, g3_5.virtues);

  const dataByGrade = {
    "gk_2": k2Cards,
    "g3_5": g35Cards,
  };

  const gradeOptions: { value: GradeKey; label: string }[] = [
    { value: "gk_2", label: "Kinder - 2nd Grade" },
    { value: "g3_5", label: "3rd - 5th Grade" },
  ];

  return <GradeContentClient initialGrade="gk_2" options={gradeOptions} dataByGrade={dataByGrade} />;
}
