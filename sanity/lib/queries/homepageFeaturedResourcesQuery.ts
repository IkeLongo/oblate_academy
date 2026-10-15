// sanity/lib/queries/homepageFeaturedResourcesQuery.ts
import { groq } from "next-sanity";
import type { Resource } from "@/app/types";

// Items whose resource no longer resolves are dropped; `items` is [] when none remain.
export const homepageFeaturedResourcesQuery = groq`
*[
  _type == "homepageFeaturedResources" &&
  _id == "homepageFeaturedResources" &&
  isActive == true
][0]{
  heading,
  subtitle,
  "items": coalesce(items[defined(resource->_id)]{
    _key,
    blurb,
    "resource": resource->{
      _id,
      title,
      resourceType,
      subject,
      kind,
      image{..., alt},
      "pdfUrl": pdf.asset->url,
      pdfThumbnail{..., alt},
      url,
      body,
      muxVideo{
        asset->{
          playbackId,
          aspectRatio
        }
      }
    }
  }, [])
}
`;

export type HomepageFeaturedResourcesData = {
  heading: string;
  subtitle?: string | null;
  items: {
    _key: string;
    blurb?: string | null;
    resource: Resource;
  }[];
} | null;
