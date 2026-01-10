// sanity/lib/fetch/fetchVirtuePage.ts
import { client } from "@/sanity/lib/client";
import { virtuePageQuery } from "@/sanity/lib/queries/virtuePage";

export type VirtueActivity = {
  _id: string;
  pdfUrl: string;
  activity: {
    title: string;
    icon: "crayon" | "pencil" | "clipboard" | "book" | "sparkles";
    slug: string;
    sortOrder?: number;
  };
};

export type VirtuePageData = {
  _id: string;
  name: string;
  slug: string;
  overviewTitle: string;
  overview: any[]; // PortableTextBlock[] if you want strict typing
  cardImage: {
    asset?: any;
    alt?: string;
  };
  activities: VirtueActivity[];
};

export async function fetchVirtuePage({ slug, grade }: { slug: string; grade: "k2" | "g3_5" }) {
  return client.fetch(virtuePageQuery, { slug, grade });
}
