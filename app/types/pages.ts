import type { SanityImage, PortableTextValue } from "./sanity";

export type RowCard = {
  _id: string;
  name: string;
  slug: string;
  cardImage: SanityImage;
};

export type PageActivity = {
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

export type PageData = {
  _id: string;
  name: string;
  feastDay?: string;
  slug: string;
  overviewTitle: string;
  overview: PortableTextValue;
  cardImage: SanityImage;
  activities: PageActivity[];
  enableGradeK_2?: boolean;
  enableGrade3_5?: boolean;
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
