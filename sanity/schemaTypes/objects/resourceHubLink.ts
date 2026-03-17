// sanity/schemaTypes/objects/resourceHubLink.ts
import { defineField, defineType } from "sanity";
import { ResourceHubLinkPreview } from "@/sanity/components/ResourceHubLinkPreview";
import { IconKeyInput } from "@/sanity/components/IconKeyInput";

export const resourceHubLink = defineType({
  name: "resourceHubLink",
  title: "Resource Hub Row",
  type: "object",
  components: {
    preview: ResourceHubLinkPreview,
  },
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'Example: "Coloring Pages", "Puzzles & Games"',
      validation: (Rule) => Rule.required().max(50),
    }),

    // ✅ SOURCE OF TRUTH: reference the category or collection
    defineField({
      name: "target",
      title: "Links To",
      type: "reference",
      to: [{ type: "category" }, { type: "resourceCollection" }],
      description:
        "Select the Category or Resource Collection this row should open. The URL slug will come from that document.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "iconKey",
      title: "Icon",
      type: "string",
      components: {
        input: IconKeyInput,
      },
      options: {
        list: [
          { title: "Lesson Plans", value: "lesson" },
          { title: "Book", value: "book" },
          { title: "Puzzle", value: "puzzle" },
          { title: "Pray", value: "pray" },
          { title: "Palette", value: "palette" },
          { title: "Notebook", value: "notebook" },
          { title: "Sparkles", value: "sparkles" },
          { title: "Parents/Users", value: "users" },
          { title: "Printable", value: "print" },
          { title: "Video", value: "video" },
          { title: "Assessment", value: "assessment" },
          { title: "Tips/Lightbulb", value: "tips" },
          { title: "File", value: "file" },
          { title: "Checkmark", value: "check" },
          { title: "Hand Heart", value: "handheart" },
          { title: "Graduation Cap", value: "graduation" },
          { title: "File Cog", value: "filecog" },
          { title: "House/Home", value: "house" },
          { title: "Discussion/Messages", value: "discussion" },
          { title: "Crosshair/Target", value: "crosshair" },
          { title: "Magnet", value: "magnet" },
          { title: "Star", value: "star" },
          { title: "Signal/Wifi", value: "signal" },
          { title: "Table of Contents", value: "tableofcontents" },
          { title: "Trending Up/Graph", value: "trendingup" },
          { title: "List Checks", value: "listchecks" },
          { title: "Briefcase Business", value: "briefcasebusiness" },
          { title: "School", value: "school" },
          { title: "Question/Help", value: "question" },
          { title: "Smile", value: "smile" },
          { title: "Target", value: "target" },
          { title: "Family", value: "family" },
        ],
      },
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
      label: "label",
      iconKey: "iconKey",
    },
  },
});
