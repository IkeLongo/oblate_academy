import { client } from "../client";
import { saintsRowCardsQuery, virtuesRowCardsQuery } from "../queries/queries";

import type { GradeKey } from "@/app/types/types";
import type { RowCard } from "@/app/types/types";

function withTimeout<T>(p: Promise<T>, ms: number, label: string) {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms: ${label}`)), ms)
    ),
  ]);
}

export async function fetchRowCards(grade: GradeKey) {
  try {
    const saints = await withTimeout(
      client.fetch<RowCard[]>(saintsRowCardsQuery, { grade }),
      8000,
      "saintsRowCardsQuery"
    );

    const virtues = await withTimeout(
      client.fetch<RowCard[]>(virtuesRowCardsQuery, { grade }),
      8000,
      "virtuesRowCardsQuery"
    );

    return { saints, virtues };
  } catch (err: any) {
    throw err;
  }
}
