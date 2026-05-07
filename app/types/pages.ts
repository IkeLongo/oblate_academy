/* eslint-disable @typescript-eslint/no-explicit-any */

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
  resources: Resource[];
  enableGradeK_2?: boolean;
  enableGrade3_5?: boolean;
};

export type ResourceKind = "pdf" | "image" | "link" | "video" | "richText";

export type Resource = {
  _id: string;
  title?: string | null;
  kind: ResourceKind;
  pdfUrl?: string;
  pdfThumbnail?: any;
  image?: any;
  url?: string;
  body?: any[];
  muxVideo?: {
    asset?: {
      playbackId?: string | null;
      aspectRatio?: string | null;
    } | null;
  } | null;
  category: {
    _id: string;
    title: string;
    icon: any;
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
