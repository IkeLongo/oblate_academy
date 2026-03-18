// sanity/schemaTypes/objects/resourceHubLink.ts
import { defineField, defineType } from "sanity";
import { ResourceHubLinkPreview } from "@/sanity/components/ResourceHubLinkPreview";

export const resourceHubLink = defineType({
  name: "resourceHubLink",
  title: "Resource Hub Row",
  type: "object",
  components: {
    preview: ResourceHubLinkPreview,
  },
  fields: [
    defineField({
      name: "target",
      title: "Linked Resource Collection",
      type: "reference",
      to: [{ type: "resourceCollection" }],
      description: "Select the Resource Collection this row should open.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "comingSoon",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "target.title",
      iconKey: "target.iconKey",
    },
  },
});
