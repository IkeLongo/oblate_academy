// sanity/schemaTypes/documents/resourceHub.ts
import { defineField, defineType } from "sanity";
import { DesktopIcon } from "@sanity/icons";

export const resourceHub = defineType({
  name: "resourceHub",
  title: "Resource Hub",
  type: "document",
  icon: DesktopIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "subtitle",
      type: "string",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "cards",
      type: "array",
      of: [{ type: "resourceHubCard" }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
