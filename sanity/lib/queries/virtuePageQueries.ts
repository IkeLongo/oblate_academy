// sanity/lib/queries/virtuePage.ts
import { groq } from "next-sanity";

export const virtuePageQuery = groq`
*[
  _type == "virtue" &&
  slug.current == $slug &&
  ($isDraft || coalesce(isActive, true) == true)
][0]{
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

  "resources": coalesce(
    select(
      $resourceGrade == "k2" => resourcesK_2,
      $resourceGrade == "g3_5" => resources3_5
    ), []
  )[]->{
    _id,
    title,
    resourceType,
    subject,
    kind,
    grade,
    tags,
    "pdfUrl": pdf.asset->url,
    pdfThumbnail{..., alt},
    url,
    body,
    image{..., alt},
    muxVideo{ asset->{ playbackId, aspectRatio } }
  } | order(_createdAt asc)
}
`;

export const virtueCategoryPageQuery = groq`
*[
  _type == "virtue" &&
  slug.current == $slug &&
  ($isDraft || coalesce(isActive, true) == true)
][0]{
  _id,
  name,
  "slug": slug.current,

  "resource": *[
    _type == "resource" &&
    grade in [$grade, "all"] &&
    virtue._ref == ^._id &&
    _id == $category
  ][0]{
    _id,
    title,
    kind,
    grade,
    tags,

    "pdfUrl": pdf.asset->url,
    "imageUrl": image.asset->url,
    url,
    body,

    pdfThumbnail{..., alt},
    image{..., alt}
  }
}
`;