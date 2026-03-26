import { sanityFetch } from "@/sanity/lib/live";
import { resourceHubQuery } from "@/sanity/lib/queries/resourceHubQueries";
import { featuredResourceOfTheMonthQuery } from "@/sanity/lib/queries/featuredResourceOfTheMonth";
import { ResourceHubSection } from "@/app/ui/components/resources/ResourceHubSection";
import FeaturedResourceKit from "@/app/ui/shared/resources/FeaturedResourceKit";

export default async function ResourcesPage() {

  const [{ data: hub }, { data: featuredKit }] = await Promise.all([
    sanityFetch({ query: resourceHubQuery }),
    sanityFetch({ query: featuredResourceOfTheMonthQuery }),
  ]);

  if (!hub) return null;

  return <>
    <ResourceHubSection hub={hub} />
    {featuredKit && (
      <FeaturedResourceKit
        title={featuredKit.title}
        description={featuredKit.description}
        ctaHref={`${featuredKit.slug.current}`}
        colorTheme={featuredKit.colorTheme}
        highlights={featuredKit.highlights}
        includedItems={featuredKit.includedItems}
      />
    )}
  </>;
}
