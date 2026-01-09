import { client } from "../client";
import { saintsRowCardsQuery, virtuesRowCardsQuery } from "../queries";

export type GradeKey = "k2" | "g3_5";

export type RowCard = {
  _id: string;
  name: string;
  slug: string;
  cardImage: any;
};

function withTimeout<T>(p: Promise<T>, ms: number, label: string) {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms: ${label}`)), ms)
    ),
  ]);
}

export async function fetchRowCards(grade: GradeKey) {
  console.log("[fetchRowCards] start", grade);

  try {
    console.log("[fetchRowCards] fetching saints...");
    const saints = await withTimeout(
      client.fetch<RowCard[]>(saintsRowCardsQuery, { grade }),
      8000,
      "saintsRowCardsQuery"
    );
    console.log("[fetchRowCards] saints ok:", saints.length);

    console.log("[fetchRowCards] fetching virtues...");
    const virtues = await withTimeout(
      client.fetch<RowCard[]>(virtuesRowCardsQuery, { grade }),
      8000,
      "virtuesRowCardsQuery"
    );
    console.log("[fetchRowCards] virtues ok:", virtues.length);

    console.log("[fetchRowCards] done");
    return { saints, virtues };
  } catch (err: any) {
    console.error("[fetchRowCards] ERROR:", err?.message || err);
    throw err;
  }
}
