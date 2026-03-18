// sanity/schemaTypes/objects/resourceHubCard.ts
import { defineField, defineType } from "sanity";
import { SquareIcon } from "@sanity/icons";
import { ResourceHubCardPreview } from "@/sanity/components/ResourceHubCardPreview";
import { IconKeyInput } from "@/sanity/components/IconKeyInput";

export const resourceHubCard = defineType({
  name: "resourceHubCard",
  title: "Resource Hub Card",
  type: "object",
  icon: SquareIcon,
  components: {
    preview: ResourceHubCardPreview,
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "description",
      type: "string",
      validation: (Rule) => Rule.required().max(140),
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

    // THEME KEY (rows inherit)
    defineField({
      name: "themeKey",
      title: "Color Theme",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Green", value: "green" },
          { title: "Purple", value: "purple" },
          { title: "Red", value: "red" },
          { title: "Yellow", value: "yellow" },
          { title: "Indigo", value: "indigo" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "rows",
      title: "Row Items",
      type: "array",
      of: [{ type: "resourceHubLink" }],
      validation: (Rule) => Rule.min(1).max(6),
    }),

    // defineField({
    //   name: "buttonLabel",
    //   title: "Button Label (optional)",
    //   type: "string",
    //   description: 'Example: "Download Plans", "Get Guides", "Access Materials"',
    // }),
    // defineField({
    //   name: "buttonLinkType",
    //   title: "Button Link Type",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Internal Route (href)", value: "href" },
    //       { title: "Open Collection", value: "collection" },
    //       { title: "None", value: "none" },
    //     ],
    //     layout: "radio",
    //   },
    //   initialValue: "none",
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: "buttonHref",
    //   title: "Button href",
    //   type: "string",
    //   hidden: ({ parent }) => parent?.buttonLinkType !== "href",
    // }),
    // defineField({
    //   name: "buttonCollection",
    //   title: "Button Collection",
    //   type: "reference",
    //   to: [{ type: "resourceCollection" }],
    //   hidden: ({ parent }) => parent?.buttonLinkType !== "collection",
    // }),

    defineField({
      name: "isActive",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { 
      title: "title",
      iconKey: "iconKey",
      themeKey: "themeKey"
    },
  },
});
