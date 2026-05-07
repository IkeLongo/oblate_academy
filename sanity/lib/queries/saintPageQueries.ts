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
    kind,
    grade,
    tags,
    "pdfUrl": pdf.asset->url,
    pdfThumbnail{..., alt},
    url,
    body,
    image{..., alt},
    muxVideo{ asset->{ playbackId, aspectRatio } },
    category->{ title, icon, "slug": slug.current, sortOrder }
  } | order(category->sortOrder asc)
}
`;

export const saintCategoryPageQuery = groq`
*[
  _type == "saint" &&
  slug.current == $slug &&
  ($isDraft || coalesce(isActive, true) == true)
][0]{
  _id,
  name,
  "slug": slug.current,

  "resources": coalesce(
    select(
      $resourceGrade == "k2" => resourcesK_2,
      $resourceGrade == "g3_5" => resources3_5
    ), []
  )[]->{
    _id,
    title,
    kind,
    grade,
    tags,
    "pdfUrl": pdf.asset->url,
    pdfThumbnail{..., alt},
    url,
    "muxPlaybackId": muxVideo.asset->playbackId,
    body,
    image{..., alt},
    category->{ title, icon, "slug": slug.current, sortOrder }
  } | order(category->sortOrder asc)
}
`;
