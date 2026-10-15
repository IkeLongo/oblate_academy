// sanity/schemaTypes/documents/homepageFeaturedResources.ts
import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

// Singleton: the document ID equals the type name.
export const HOMEPAGE_FEATURED_RESOURCES_ID = "homepageFeaturedResources";

export const homepageFeaturedResources = defineType({
  name: "homepageFeaturedResources",
  title: "Homepage Featured Resources",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "The visible section heading on the homepage.",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (optional)",
      type: "string",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "isActive",
      title: "Show on Website",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "items",
      title: "Featured Resources",
      type: "array",
      of: [{ type: "featuredResourceItem" }],
      description: "Choose 1–3 resources. The order here is the order on the homepage.",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(3)
          .custom((items) => {
            if (!Array.isArray(items)) return true;

            const seen = new Set<string>();
            const duplicates: { message: string; path: unknown[] }[] = [];

            for (const item of items as { _key?: string; resource?: { _ref?: string } }[]) {
              const ref = item?.resource?._ref;
              if (!ref) continue;
              if (seen.has(ref)) {
                duplicates.push({
                  message: "This resource is already featured. Each resource can only appear once.",
                  path: [{ _key: item._key }],
                });
              }
              seen.add(ref);
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return duplicates.length ? (duplicates as any) : true;
          }),
    }),
  ],
  preview: {
    select: { title: "heading", isActive: "isActive", items: "items" },
    prepare({ title, isActive, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Homepage Featured Resources",
        subtitle: `${isActive ? "Active" : "Inactive"} • ${count} ${count === 1 ? "resource" : "resources"}`,
      };
    },
  },
});
