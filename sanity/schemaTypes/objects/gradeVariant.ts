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
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "actionCards",
      title: "Action Cards",
      type: "array",
      of: [{ type: "actionCard" }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "relatedVirtues",
      title: "Related Virtues (optional)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "virtue" }] }],
    }),

    defineField({
      name: "parentTeacherResourcesHeading",
      title: "Parent/Teacher Resources Heading (optional)",
      type: "string",
      initialValue: "PARENT AND TEACHER RESOURCES",
    }),

    defineField({
      name: "parentTeacherResourcesBlurb",
      title: "Parent/Teacher Resources Blurb (optional)",
      type: "string",
    }),

    defineField({
      name: "parentTeacherResourcesLink",
      title: "Parent/Teacher Resources Link (optional)",
      type: "reference",
      to: [{ type: "resource" }],
    }),
  ],
});
