// Resolves a [resourceType] slug to a collection (category lookup removed — categories are deprecated)
export const resourceTypeResolverQuery = /* groq */ `
{
  "collection": *[_type == "resourceCollection" && slug.current == $slug][0]{
    _id, title, "slug": slug.current
  }
}
`;

// Deprecated — kept for reference only; no longer called by the app
// export const resourcesByCategorySlugQuery = ...

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
      duration,
      "mp4Support": data.mp4_support,
      "staticRenditions": data.static_renditions.files[]{
        name,
        ext,
        status
      }
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
      duration,
      "mp4Support": data.mp4_support,
      "staticRenditions": data.static_renditions.files[]{
        name,
        ext,
        status
      }
    }
  },
  body,
  image{..., alt},
  images[]{..., alt},
  collections[]->{ _type, title, "slug": slug.current }
}
`;
