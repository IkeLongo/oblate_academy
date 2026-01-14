// sanity/lib/queries/virtuePage.ts
import { groq } from "next-sanity";

export const virtuePageQuery = groq`
*[_type == "virtue" && slug.current == $slug && isActive == true][0]{
  _id,
  name,
  "slug": slug.current,
  cardImage{..., alt},
  "relatedSaints": relatedSaints[]->{
    _id,
    name,
    "slug": slug.current,
    cardImage{..., alt}
  },
  enableGradeK_2,
  enableGrade3_5,

  "overviewTitle": coalesce(select($grade == "gk_2" => gk_2.overviewTitle, g3_5.overviewTitle), name),
  "overview": select($grade == "gk_2" => gk_2.overview, g3_5.overview),

  "activities": *[
    _type == "resource" &&
    grade == $resourceGrade &&
    virtue._ref == ^._id
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

export const virtueActivityPageQuery = groq`
*[
  _type == "virtue" &&
  slug.current == $slug &&
  ($isDraft || coalesce(isActive, true) == true)
][0]{
  _id,
  name,
  "slug": slug.current,

  "resource": *[
    _type=="resource" &&
    grade==$grade &&
    virtue._ref==^._id &&
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
