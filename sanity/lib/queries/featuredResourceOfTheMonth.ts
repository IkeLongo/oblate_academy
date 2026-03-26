export const featuredResourceOfTheMonthQuery = `
*[_type == "featuredResourceKit" && isActive == true && defined(monthLabel)] | order(startsAt desc)[0]{
  _id,
  title,
  slug,
  description,
  ctaLabel,
  monthLabel,
  colorTheme,
  highlights,
  includedItems,
  coverImage,
  resources[]-> {
    _id,
    title,
    slug
  }
}
`;

export const featuredResourceKitByIdQuery = `
*[_type == "featuredResourceKit" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  ctaLabel,
  monthLabel,
  intro,
  colorTheme,
  highlights,
  includedItems,
  "coverImage": coverImage { ..., "url": asset->url },
  focusType,

  saint->{
    name,
    "slug": slug.current
  },

  virtue->{
    name,
    "slug": slug.current
  },

  resources[]-> {
    _id,
    title,
    "slug": slug.current,
    kind,
    body,
    "pdfUrl": pdf.asset->url,
    image
  }
}
`;