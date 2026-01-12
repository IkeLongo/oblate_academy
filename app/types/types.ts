// app/types/types.ts
import type { PortableTextBlock, ImageAsset } from '@sanity/types';

export type GradeKey = "gk_2" | "g3_5";

export type GradeKeyLink = "k-2" | "3-5";

export const GRADE_TO_LINK: Record<GradeKey, GradeKeyLink> = {
  gk_2: "k-2",
  g3_5: "3-5",
};

export const LINK_TO_GRADE: Record<GradeKeyLink, GradeKey> = {
  "k-2": "gk_2",
  "3-5": "g3_5",
};

export function toGradeLink(g: GradeKey): GradeKeyLink {
  return GRADE_TO_LINK[g];
}

export function toGradeKey(link: GradeKeyLink): GradeKey {
  return LINK_TO_GRADE[link];
}

export function isGradeKey(val: unknown): val is GradeKey {
  return val === "gk_2" || val === "g3_5";
}

export function isGradeLink(val: unknown): val is GradeKeyLink {
  return val === "k-2" || val === "3-5";
}

export type RowCard = {
  _id: string;
  name: string;
  slug: string;
  cardImage: {
    asset?: ImageAsset;
    alt?: string;
  };
};

export type ContentCardModel = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type ContentCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  color: { text: string; border: string; bg: string };
};

export type PillarCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;

  /** Tailwind class (recommended): e.g. "border-emerald-500" */
  borderClassName: string;

  /** Optional extra classes */
  className?: string;
};

export type GiggleIconProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string; // for styling
  styleClass?: string; // for positioning
  delay?: number;
};

export type ScribbleImageProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
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
  overview: PortableTextBlock[]; // PortableTextBlock[] if you want strict typing
  cardImage: {
    asset?: ImageAsset;
    alt?: string;
  };
  activities: PageActivity[];
  enableGradeK_2?: boolean;
  enableGrade3_5?: boolean;
};

export type Saint = {
  name: string;
  slug: string;
  cardImage: {
    asset?: ImageAsset;
    alt?: string;
  };
  // ...other saint-specific fields
};

export type Virtue = {
  name: string;
  slug: string;
  cardImage: {
    asset?: ImageAsset;
    alt?: string;
  };
  // ...other virtue-specific fields
};

export type AutoplayMuxVideoProps = {
  playbackId: string;

  /** Wrapper styling (Tailwind) */
  className?: string;

  /** Wrapper inline styles (e.g., aspectRatio, overflow, etc.) */
  containerStyle?: React.CSSProperties;

  /** Player inline styles (positioning/crop/scale) */
  playerStyle?: React.CSSProperties;

  /** Common controls */
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";

  /** Turn off all user interaction (recommended for hero backgrounds) */
  disablePointerEvents?: boolean;

  // Metadata
  videoId?: string;
  videoTitle?: string;
  viewerUserId?: string;
};