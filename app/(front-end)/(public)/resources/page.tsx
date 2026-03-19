import { sanityFetch } from "@/sanity/lib/live";
import { resourceHubQuery } from "@/sanity/lib/queries/resourceHubQueries";
import { ResourceHubSection } from "@/app/ui/components/resources/ResourceHubSection";
import FeaturedResourceKit from "@/app/ui/shared/resources/FeaturedResourceKit";


export default async function ParentTeacherPage() {
  const { data } = await sanityFetch({ query: resourceHubQuery });

  if (!data) return null;

  return <>
    <ResourceHubSection hub={data} />
    <FeaturedResourceKit
      title="Saint Nicholas Teaching Kit"
      description="Everything you need to teach children about the real Saint Nicholas, including his story, traditions around the world, and how he connects to our modern celebration of Christmas."
      ctaHref="/resources/saint-nicholas-teaching-kit"
      highlights={[
        { text: "15-page lesson plan with activities", icon: "lesson" },
        { text: "Printable coloring pages and worksheets", icon: "printable" },
        { text: "Instructional video for teachers", icon: "video" },
      ]}
      includedItems={[
        { text: "Saint Nicholas Biography" },
        { text: "Christmas Traditions Worldwide" },
        { text: "Interactive Activities" },
        { text: "Assessment Rubric" },
        { text: "Parent Take-Home Sheet" },
      ]}
    />
  </>;
}
