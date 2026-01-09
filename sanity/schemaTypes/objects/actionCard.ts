// /sanity/schemaTypes/objects/actionCard.ts
import { defineField, defineType } from "sanity";
import { DocumentPdfIcon } from "@sanity/icons";

export const actionCard = defineType({
  name: "actionCard",
  title: "Action Card",
  type: "object",
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
      description: 'Example: "Coloring Page", "Draw About It", "Challenge"',
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Crayon", value: "crayon" },
          { title: "Pencil", value: "pencil" },
          { title: "Clipboard", value: "clipboard" },
          { title: "Book", value: "book" },
          { title: "Sparkles", value: "sparkles" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resource",
      title: "Opens Resource",
      type: "reference",
      to: [{ type: "resource" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "icon" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `Icon: ${subtitle}` : undefined };
    },
  },
});
