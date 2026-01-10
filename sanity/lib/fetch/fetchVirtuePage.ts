// sanity/lib/fetch/fetchVirtuePage.ts
import { client } from "@/sanity/lib/client";
import { virtuePageQuery, virtueActivityPageQuery } from "@/sanity/lib/queries/virtuePage";

export async function fetchVirtuePage({ slug, grade }: { slug: string; grade: "k2" | "g3_5" }) {
  return client.fetch(virtuePageQuery, { slug, grade });
}

export async function fetchVirtueActivityPage(params: {
  grade: "k2" | "g3_5";
  slug: string;
  activity: string;
}) {
  return client.fetch(virtueActivityPageQuery, params);
}