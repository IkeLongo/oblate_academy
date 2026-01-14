// sanity/lib/fetch/fetchVirtuePage.ts
import { client } from "@/sanity/lib/client";
import { virtuePageQuery, virtueActivityPageQuery } from "@/sanity/lib/queries/virtuePageQueries";

import type { GradeKey } from "@/app/types/types";

export async function fetchVirtuePage({ slug, grade }: { slug: string; grade: GradeKey }) {
  return client.fetch(virtuePageQuery, { slug, grade });
}

export async function fetchVirtueActivityPage(params: {
  grade: GradeKey;
  slug: string;
  activity: string;
}) {
  return client.fetch(virtueActivityPageQuery, params);
}