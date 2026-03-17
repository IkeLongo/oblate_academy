// sanity/schemaTypes/documents/category.ts
import { defineField, defineType } from "sanity";
import { TagsIcon } from '@sanity/icons'

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
      description: 'Example: "Coloring Page", "Draw About It", "Challenge"',
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Upload an icon image for this category.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .slice(0, 50),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "icon" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : undefined,
        media,
      };
    },
  },
});
