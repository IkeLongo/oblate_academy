import type { PortableTextBlock, ImageAsset } from "@sanity/types";

export type SanityImage = {
  asset?: ImageAsset;
  alt?: string;
};

export type PortableTextValue = PortableTextBlock[];
