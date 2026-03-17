// sanity/lib/fetch/fetchSaintK2Page.ts
import { client } from "@/sanity/lib/client";
import { saintCategoryPageQuery, saintPageQuery } from "@/sanity/lib/queries/saintPageQueries";

import type { GradeKey } from "@/app/types";

export async function fetchSaintPage({ slug, grade }: { slug: string; grade: GradeKey }) {
  return client.fetch(saintPageQuery, { slug, grade });
}

export async function fetchSaintCategoryPage(params: {
  grade: GradeKey;
  slug: string;
  category: string;
}) {
  return client.fetch(saintCategoryPageQuery, params);
}
