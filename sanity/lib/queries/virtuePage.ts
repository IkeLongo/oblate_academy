// sanity/lib/queries/virtuePage.ts
import { groq } from "next-sanity";

export const virtuePageQuery = groq`
*[_type == "virtue" && slug.current == $slug && isActive == true][0]{
  _id,
  name,
  "slug": slug.current,
  cardImage{..., alt},
  enableK2,
  enableG35,

  "overviewTitle": coalesce(select($grade == "k2" => k2.overviewTitle, g3_5.overviewTitle), name),
  "overview": select($grade == "k2" => k2.overview, g3_5.overview),

  "activities": *[
    _type == "resource" &&
    grade == $grade &&
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
*[_type=="virtue" && slug.current==$slug && isActive==true][0]{
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
