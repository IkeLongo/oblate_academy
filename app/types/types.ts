// app/types/types.ts

export type GradeKey = "k2" | "g3_5";

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
  slug: string;
  overviewTitle: string;
  overview: any[]; // PortableTextBlock[] if you want strict typing
  cardImage: {
    asset?: any;
    alt?: string;
  };
  activities: PageActivity[];
  enableK2?: boolean;
  enableG35?: boolean;
};