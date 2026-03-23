export const featuredResourceOfTheMonthQuery = `
*[_type == "featuredResourceKit" && isActive == true && defined(monthLabel)] | order(startsAt desc)[0]{
  _id,
  title,
  slug,
  description,
  ctaLabel,
  monthLabel,
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
