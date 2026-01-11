// sanity/lib/fetch/fetchSaintK2Page.ts
import { client } from "@/sanity/lib/client";
import { saintActivityPageQuery, saintPageQuery } from "@/sanity/lib/queries/saintPage";

import type { GradeKey } from "@/app/types/types";

export async function fetchSaintPage({ slug, grade }: { slug: string; grade: GradeKey }) {
  return client.fetch(saintPageQuery, { slug, grade });
}

export async function fetchSaintActivityPage(params: {
  grade: GradeKey;
  slug: string;
  activity: string;
}) {
  return client.fetch(saintActivityPageQuery, params);
}
