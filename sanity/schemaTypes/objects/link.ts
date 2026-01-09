// /sanity/schemaTypes/objects/link.ts
import { defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internal",
      title: "Internal path",
      type: "string",
      hidden: ({ parent }) => parent?.type !== "internal",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const t = (ctx.parent as any)?.type;
          if (t === "internal" && !val) return "Internal path is required";
          return true;
        }),
    }),
    defineField({
      name: "external",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.type !== "external",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).custom((val, ctx) => {
          const t = (ctx.parent as any)?.type;
          if (t === "external" && !val) return "External URL is required";
          return true;
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.type !== "external",
    }),
  ],
});
