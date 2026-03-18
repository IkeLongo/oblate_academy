export const resourceTypeResolverQuery = /* groq */ `
{
  "category": *[_type == "category" && slug.current == $slug][0]{
    _id, title, "slug": slug.current
  },
  "collection": *[_type == "resourceCollection" && slug.current == $slug][0]{
    _id, title, "slug": slug.current
  }
}
`;

export const resourcesByCategorySlugQuery = /* groq */ `
*[
  _type == "resource"
  && grade in [$grade, "all"]
  && defined(category)
  && category->slug.current == $categorySlug
] | order(_createdAt desc) {
  _id,
  title,
  kind,
  grade,
  tags,
  "pdfUrl": pdf.asset->url,
  pdfThumbnail{
    ...,
    alt
  },
  url,
  muxVideo{
    asset->{
      playbackId,
      status,
      aspectRatio,
      duration
    }
  },
  body,
  image{
    ...,
    alt
  },
  // optional gallery later
  images[]{
    ...,
    alt
  },
  category->{ title, "slug": slug.current },
  belongsTo->{ _type, title, name }
}
`;

export const resourcesByTagQuery = /* groq */ `
*[
  _type == "resource"
  && grade in [$grade, "all"]
  && $tag in tags
] | order(_createdAt desc) {
  _id,
  title,
  kind,
  grade,
  tags,
  "pdfUrl": pdf.asset->url,
  pdfThumbnail{
    ...,
    alt
  },
  url,
  body,
  muxVideo{
    asset->{
      playbackId,
      status,
      aspectRatio,
      duration
    }
  },
  image{
    ...,
    alt
  },
  images[]{
    ...,
    alt
  },
  category->{ title, "slug": slug.current },
  belongsTo->{ _type, title, name }
}
`;

export const resourcesByCollectionSlugQuery = /* groq */ `
*[
  _type == "resource" &&
  grade in [$grade, "all"] &&
  defined(collections) &&
  $collectionSlug in collections[]->slug.current
] | order(_createdAt desc) {
  _id,
  title,
  kind,
  grade,
  tags,
  "pdfUrl": pdf.asset->url,
  pdfThumbnail{..., alt},
  url,
  muxVideo{
    asset->{
      playbackId,
      status,
      aspectRatio,
      duration
    }
  },
  body,
  image{..., alt},
  images[]{..., alt},
  category->{ title, "slug": slug.current },
  collections[]->{ _type, title, "slug": slug.current }
}
`;