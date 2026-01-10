// sanity/lib/fetch/fetchSaintK2Page.ts
import { client } from "@/sanity/lib/client";
import { saintPageQuery } from "@/sanity/lib/queries/saintPage";

export type SaintK2Activity = {
  _id: string;
  pdfUrl: string;
  activity: {
    _id: string;
    title: string;
    icon: "crayon" | "pencil" | "clipboard" | "book" | "sparkles";
    slug: string;
    sortOrder?: number;
  };
};

export type SaintK2PageData = {
  _id: string;
  name: string;
  slug: string;
  overviewTitle: string;
  overview: any[]; // PortableTextBlock[] if you want strict typing
  cardImage: {
    asset?: any;
    alt?: string;
  };
  activities: SaintK2Activity[];
};

export async function fetchSaintPage({ slug, grade }: { slug: string; grade: "k2" | "g3_5" }) {
  return client.fetch(saintPageQuery, { slug, grade });
}
