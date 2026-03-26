import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { featuredResourceKitByIdQuery } from "@/sanity/lib/queries/featuredResourceOfTheMonth";
import { FeaturedResourceKitMain } from "@/app/ui/pages/resources/FeaturedResourceKitMain";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FeaturedResourcePage({ params }: Props) {
  const { id: slug } = await params;
  const data = await client.fetch(featuredResourceKitByIdQuery, { slug });

  if (!data) notFound();

  return <FeaturedResourceKitMain data={data} />;
}