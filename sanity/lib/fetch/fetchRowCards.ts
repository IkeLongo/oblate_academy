import { client } from "../client";
import { saintsRowCardsQuery, virtuesRowCardsQuery } from "../queries";

export type GradeKey = "k2" | "g3_5";

export type RowCard = {
  _id: string;
  name: string;
  slug: string;
  cardImage: { alt?: string; asset: { url: string } };
};

export async function fetchRowCards(grade: GradeKey) {
  const [saints, virtues] = await Promise.all([
    client.fetch<RowCard[]>(saintsRowCardsQuery, { grade }),
    client.fetch<RowCard[]>(virtuesRowCardsQuery, { grade }),
  ]);

  return { saints, virtues };
}