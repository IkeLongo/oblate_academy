export const saintsRowCardsQuery = `*[
  _type == "saint" &&
  isActive == true &&
  defined(name) &&
  defined(slug.current) &&
  defined(cardImage.asset) &&
  (
    // show if that grade variant exists
    ($grade == "gk_2" && defined(gk_2)) ||
    ($grade == "g3_5" && defined(g3_5))
  )
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  cardImage{
    ...,
    alt
  }
}`;

export const virtuesRowCardsQuery = `*[
  _type == "virtue" &&
  isActive == true &&
  defined(name) &&
  defined(slug.current) &&
  defined(cardImage.asset) &&
  (
    ($grade == "gk_2" && defined(gk_2)) ||
    ($grade == "g3_5" && defined(g3_5))
  )
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  cardImage{
    ...,
    alt
  }
}`;