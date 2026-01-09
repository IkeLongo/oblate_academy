// /sanity/schemaTypes/documents/virtue.ts
import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const virtue = defineType({
  name: "virtue",
  title: "Virtue",
  type: "document",
  icon: SparklesIcon,
  groups: [
    { name: "shared", title: "Shared" },
    { name: "k2", title: "K–2" },
    { name: "g3_5", title: "3–5" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Virtue Name",
      type: "string",
      group: "shared",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "shared",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card Image (used in virtues row)",
      type: "image",
      group: "shared",
      options: { hotspot: true },
      description: "⚠️ Please upload images as WebP for best performance.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description:
            "Describe the image for accessibility. Example: “Children practicing the virtue of responsibility.”",
          validation: (Rule) =>
            Rule.required().max(120),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      group: "shared",
      initialValue: true,
    }),

    // K–2 variant
    defineField({
      name: "k2",
      title: "Kinder - 2nd Grade Page",
      type: "gradeVariant",
      group: "k2",
    }),

    // 3–5 variant
    defineField({
      name: "g3_5",
      title: "3rd - 5th Grade Page",
      type: "gradeVariant",
      group: "g3_5",
    }),
  ],
  preview: {
    select: { title: "name", media: "cardImage" },
    prepare({ title, media }) {
      return { title, subtitle: "Virtue", media };
    },
  },
});
