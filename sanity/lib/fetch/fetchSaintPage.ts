// sanity/lib/fetch/fetchSaintK2Page.ts
import { client } from "@/sanity/lib/client";
import { saintActivityPageQuery, saintPageQuery } from "@/sanity/lib/queries/saintPage";

export async function fetchSaintPage({ slug, grade }: { slug: string; grade: "k2" | "g3_5" }) {
  return client.fetch(saintPageQuery, { slug, grade });
}

export async function fetchSaintActivityPage(params: {
  grade: "k2" | "g3_5";
  slug: string;
  activity: string;
}) {
  return client.fetch(saintActivityPageQuery, params);
}
