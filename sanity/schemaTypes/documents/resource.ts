// /sanity/schemaTypes/documents/resource.ts
import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "grade",
      title: "Grade Applicability",
      type: "string",
      options: {
        list: [
          { title: "Kinder - 2nd Grade", value: "k2" },
          { title: "3rd - 5th Grade", value: "g3_5" },
          { title: "Both", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "both",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "kind",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "Worksheet", value: "worksheet" },
          { title: "Coloring Page", value: "coloring" },
          { title: "Challenge", value: "challenge" },
          { title: "Activity", value: "activity" },
          { title: "Guide", value: "guide" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "thumbnail",
      title: "Thumbnail (optional)",
      type: "image",
      options: { hotspot: true },
      description: "⚠️ Please upload images as WebP for best performance.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.max(120),
        }),
      ],
    }),

    defineField({
      name: "contentType",
      title: "Content Type",
      type: "string",
      options: {
        list: [
          { title: "PDF Upload", value: "pdf" },
          { title: "Image Upload", value: "image" },
          { title: "External URL", value: "url" },
        ],
        layout: "radio",
      },
      initialValue: "pdf",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: { accept: "application/pdf" },
      hidden: ({ parent }) => parent?.contentType !== "pdf",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          if ((ctx.parent as any)?.contentType === "pdf" && !val)
            return "PDF file is required";
          return true;
        }),
    }),

    defineField({
      name: "imageFile",
      title: "Image File",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.contentType !== "image",
      description: "⚠️ Please upload images as WebP for best performance.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required().max(120),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          if ((ctx.parent as any)?.contentType === "image" && !val)
            return "Image is required";
          return true;
        }),
    }),

    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.contentType !== "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).custom((val, ctx) => {
          if ((ctx.parent as any)?.contentType === "url" && !val)
            return "URL is required";
          return true;
        }),
    }),

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", grade: "grade", kind: "kind", media: "thumbnail" },
    prepare({ title, grade, kind, media }) {
      const g =
        grade === "k2" ? "K–2" : grade === "g3_5" ? "3–5" : "Both grades";
      return { title, subtitle: `${kind} • ${g}`, media };
    },
  },
});
