import { sanityFetch } from "@/sanity/lib/live";
import { resourceHubQuery } from "@/sanity/lib/queries/resourceHubQueries";
import { ResourceHubSection } from "@/app/ui/components/resources/ResourceHubSection";

export default async function ParentTeacherPage() {
  const { data } = await sanityFetch({ query: resourceHubQuery });

  if (!data) return null;

  return <ResourceHubSection hub={data} />;
}
