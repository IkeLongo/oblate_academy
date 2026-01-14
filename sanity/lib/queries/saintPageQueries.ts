// sanity/lib/queries/saintPage.ts
import { groq } from "next-sanity";

export const saintPageQuery = groq`
*[
  _type == "saint" &&
  slug.current == $slug &&
  ($isDraft || coalesce(isActive, true) == true)
][0]{
  _id,
  name,
  feastDay,
  "slug": slug.current,
  cardImage{..., alt},
  "relatedVirtues": relatedVirtues[]->{
    _id,
    name,
    "slug": slug.current,
    cardImage{..., alt}
  },
  enableGardeK_2,
  enableGrade3_5,

  "overviewTitle": coalesce(select($grade == "gk_2" => gk_2.overviewTitle, g3_5.overviewTitle), name),
  "overview": select($grade == "gk_2" => gk_2.overview, g3_5.overview),

  "activities": *[
    _type == "resource" &&
    grade == $grade &&
    saint._ref == ^._id
  ]{
    _id,
    "pdfUrl": pdf.asset->url,
    activity->{
      title,
      icon,
      "slug": slug.current,
      sortOrder
    }
  } | order(activity.sortOrder asc)
}
`;

export const saintActivityPageQuery = groq`
*[
  _type == "saint" &&
  slug.current == $slug &&
  ($isDraft || coalesce(isActive, true) == true)
][0]{
  _id,
  name,
  "slug": slug.current,

  "resource": *[
    _type=="resource" &&
    grade==$grade &&
    saint._ref==^._id &&
    activity->slug.current==$activity
  ][0]{
    _id,
    "pdfUrl": pdf.asset->url,
    activity->{
      title,
      icon,
      "slug": slug.current
    }
  }
}
`;