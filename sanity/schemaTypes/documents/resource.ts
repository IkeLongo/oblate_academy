// sanity/schemaTypes/documents/resource.ts
import { defineField, defineType } from "sanity";
import { DocumentPdfIcon } from "@sanity/icons";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title (optional)",
      type: "string",
      description:
        "Optional — if left blank, the site can display a generated title like “Coloring Page”.",
    }),

    defineField({
      name: "grade",
      title: "Grade",
      type: "string",
      options: {
        list: [
          { title: "Kinder - 2nd", value: "k2" },
          { title: "3rd - 5th", value: "g3_5" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "activity",
      title: "Activity",
      type: "reference",
      to: [{ type: "activity" }],
      validation: (Rule) => Rule.required(),
    }),

    // Attach to exactly one: saint OR virtue
    defineField({
      name: "saint",
      title: "Saint (optional)",
      type: "reference",
      to: [{ type: "saint" }],
    }),
    defineField({
      name: "virtue",
      title: "Virtue (optional)",
      type: "reference",
      to: [{ type: "virtue" }],
    }),

    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (Rule) => Rule.required(),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((doc: any) => {
      const hasSaint = !!doc?.saint?._ref;
      const hasVirtue = !!doc?.virtue?._ref;
      if (hasSaint === hasVirtue) return "Select exactly one: Saint OR Virtue.";
      return true;
    }),
  preview: {
    select: {
      grade: "grade",
      activity: "activity.title",
      saint: "saint.name",
      virtue: "virtue.name",
    },
    prepare({ grade, activity, saint, virtue }) {
      const who = saint || virtue || "Unlinked";
      const g = grade === "k2" ? "K–2" : grade === "g3_5" ? "3–5" : grade;
      return { title: `${activity || "Resource"} — ${who}`, subtitle: g };
    },
  },
});
