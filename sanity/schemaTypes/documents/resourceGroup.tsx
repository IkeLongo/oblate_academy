// sanity/schemaTypes/documents/resourceGroup.ts
import { defineField, defineType } from "sanity";
import { FolderIcon } from "@sanity/icons";

export const resourceGroup = defineType({
  name: "resourceGroup",
  title: "Resource Group",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (R) => R.required().max(80),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "collection",
      title: "Parent Collection",
      type: "reference",
      to: [{ type: "resourceCollection" }],
      options: {
        filter: ({ parent }: any) => {
          const collectionId = parent?.collection?._ref;
          if (!collectionId) return { filter: "_id == $none", params: { none: "nope" } };

          return {
            filter: '_type == "resourceGroup" && collection._ref == $collectionId',
            params: { collectionId },
          };
        },
      },
      validation: (R) => R.required(),
    }),
    // Optional “owner” anchor for templates like bySaint/byVirtue
    defineField({
      name: "belongsTo",
      title: "Belongs To (optional)",
      type: "reference",
      to: [{ type: "saint" }, { type: "virtue" }],
      description:
        "Optional: ties this group to a Saint or Virtue for templated collections.",
    }),

    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),

    defineField({
      name: "isActive",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { 
      title: "title", 
      collectionTitle: "collection.title"
    },
    prepare({ title, collectionTitle }) {
      return { 
        title, 
        subtitle: collectionTitle ? `In: ${collectionTitle}` : undefined 
      };
    },
  },
});
