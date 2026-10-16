import { sanityFetch } from "@/sanity/lib/live";
import {
  homepageFeaturedResourcesQuery,
  type HomepageFeaturedResourcesData,
} from "@/sanity/lib/queries/homepageFeaturedResourcesQuery";
import FeaturedResourcesClient from "./client/FeaturedResourcesClient";

export default async function FeaturedResources() {
  const { data } = await sanityFetch({ query: homepageFeaturedResourcesQuery });
  const section = data as HomepageFeaturedResourcesData;

  const heading = section?.heading?.trim();
  // Schema allows at most 3; slice guards against data that bypassed validation.
  const items = (section?.items ?? []).filter((i) => i?._key && i.resource?._id).slice(0, 3);

  if (!section || !heading || items.length === 0) return null;

  return (
    <div className="base bg-blue-50">
      <section aria-labelledby="featured-resources-heading">
        <div className="text-center">
          <h2 id="featured-resources-heading" className="text-3xl font-extrabold text-blue-400 sm:text-4xl">
            {heading}
          </h2>
          {section.subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-lg text-black-300">{section.subtitle}</p>
          )}
        </div>

        <div className="mt-10">
          <FeaturedResourcesClient items={items} />
        </div>
      </section>
    </div>
  );
}
