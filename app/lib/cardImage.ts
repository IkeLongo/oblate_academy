import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/app/types";

export const FALLBACK_CARD_IMAGE = "/backup/radiant-hands-praying-in-sacred-blue.webp";

type CardImageSize = { width: number; height: number };

/**
 * Resolves a Saint/Virtue card image. Falls back to the branded placeholder
 * when the image or its asset is missing, so the Sanity URL builder is never
 * called with an incomplete image.
 */
export function getCardImage(
  image: SanityImage | null | undefined,
  name: string,
  size?: CardImageSize
): { imageSrc: string; imageAlt: string } {
  if (!image?.asset) {
    // Generic artwork: alt must not imply it depicts the specific Saint/Virtue.
    return {
      imageSrc: FALLBACK_CARD_IMAGE,
      imageAlt: `Placeholder artwork of praying hands for ${name}`,
    };
  }

  const builder = urlFor(image);
  const url = size
    ? builder.width(size.width).height(size.height).fit("crop").auto("format").url()
    : builder.url();

  return { imageSrc: url, imageAlt: image.alt || name };
}
