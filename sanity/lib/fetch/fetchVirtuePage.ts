// sanity/lib/fetch/fetchVirtuePage.ts
import { client } from "@/sanity/lib/client";
import { virtuePageQuery, virtueCategoryPageQuery } from "@/sanity/lib/queries/virtuePageQueries";

import type { GradeKey } from "@/app/types";

export async function fetchVirtuePage({ slug, grade }: { slug: string; grade: GradeKey }) {
  return client.fetch(virtuePageQuery, { slug, grade });
}

export async function fetchVirtueCategoryPage(params: {
  grade: GradeKey;
  slug: string;
  category: string;
}) {
  return client.fetch(virtueCategoryPageQuery, params);
}