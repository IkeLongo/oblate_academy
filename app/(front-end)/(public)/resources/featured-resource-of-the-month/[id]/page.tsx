import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { featuredResourceKitByIdQuery } from "@/sanity/lib/queries/featuredResourceOfTheMonth";
import { FeaturedResourceKitMain } from "@/app/ui/pages/resources/FeaturedResourceKitMain";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const data = await client.fetch<{ title: string; description?: string } | null>(
    `*[_type == "featuredResourceKit" && slug.current == $slug][0]{ title, description }`,
    { slug }
  );
  const title = data?.title ?? "Featured Resource Kit";
  const description =
    data?.description ??
    "Explore this month's featured Catholic resource kit from Oblate Academy.";
  return {
    title,
    description,
    openGraph: { title: `${title} | Oblate Academy`, description },
  };
}

export default async function FeaturedResourcePage({ params }: Props) {
  const { id: slug } = await params;
  const data = await client.fetch(featuredResourceKitByIdQuery, { slug });

  if (!data) notFound();

  return <FeaturedResourceKitMain data={data} />;
}