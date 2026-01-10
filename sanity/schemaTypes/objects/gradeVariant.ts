// /sanity/schemaTypes/objects/gradeVariant.ts
import { defineField, defineType } from "sanity";

export const gradeVariant = defineType({
  name: "gradeVariant",
  title: "Grade Variant",
  type: "object",
  fields: [
    defineField({
      name: "overviewTitle",
      title: "Page Title Override (optional)",
      type: "string",
      description:
        "Leave blank to use the Saint/Virtue name as the page title.",
    }),

    defineField({
      name: "overview",
      title: "Overview Content",
      type: "array",
      of: [{ type: "block" }],
      // ✅ do NOT require here (require conditionally at parent)
      validation: (Rule) => Rule.min(1),
    }),

    defineField({
      name: "relatedVirtues",
      title: "Related Virtues (optional)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "virtue" }] }],
    }),

    defineField({
      name: "parentTeacherResourcesLink",
      title: "Parent/Teacher Resources Link (optional)",
      type: "reference",
      to: [{ type: "resource" }],
    }),
  ],
});
