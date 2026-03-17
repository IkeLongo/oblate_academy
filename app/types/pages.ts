
import type { SanityImage, PortableTextValue } from "./sanity";

export type RowCard = {
  _id: string;
  name: string;
  slug: string;
  cardImage: SanityImage;
};

export type PageCategory = {
  _id: string;
  pdfUrl: string;
  category: {
    _id: string;
    title: string;
    icon: "crayon" | "pencil" | "clipboard" | "book" | "sparkles";
    slug: string;
    sortOrder?: number;
  };
};

export type PageData = {
  _id: string;
  name: string;
  feastDay?: string;
  slug: string;
  overviewTitle: string;
  overview: PortableTextValue;
  cardImage: SanityImage;
  resources: PageCategory[];
  enableGradeK_2?: boolean;
  enableGrade3_5?: boolean;
};

export type ResourceKind = "pdf" | "image" | "link" | "video" | "richText";

export type Resource = {
  _id: string;
  kind: ResourceKind;
  pdfUrl?: string;
  image?: { alt?: string };
  url?: string;
  body?: any[];
  category: {
    _id: string;
    title: string;
    icon: "crayon" | "pencil" | "clipboard" | "book" | "sparkles";
    slug: string;
    sortOrder?: number;
  };
  [key: string]: any;
};

export type Saint = {
  name: string;
  slug: string;
  cardImage: SanityImage;
};

export type Virtue = {
  name: string;
  slug: string;
  cardImage: SanityImage;
};
