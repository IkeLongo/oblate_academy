export type ContentCardModel = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type ContentCardProps = ContentCardModel & {
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
