// /sanity/schemaTypes/objects/gradeVariant.ts
import { defineField, defineType } from "sanity";

export const gradeVariant = defineType({
  name: "gradeVariant",
  title: "Grade Variant",
  type: "object",
  fields: [
    // defineField({
    //   name: "overviewTitle",
    //   title: "Page Title Override (optional)",
    //   type: "string",
    //   description:
    //     "Leave blank to use the Saint/Virtue name as the page title.",
    // }),

    defineField({
      name: "overview",
      title: "Overview Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Describe the image for screen readers.",
              validation: (R) => R.required().max(120),
            }),
            defineField({
              name: "alignment",
              type: "string",
              title: "Image Alignment",
              initialValue: "center",
              options: {
                list: [
                  { title: "Left", value: "left" },
                  { title: "Center", value: "center" },
                  { title: "Right", value: "right" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
            }),
            defineField({
              name: "width",
              type: "string",
              title: "Image Width",
              initialValue: "full",
              options: {
                list: [
                  { title: "Extra Small", value: "xs" },
                  { title: "Small", value: "sm" },
                  { title: "Medium", value: "md" },
                  { title: "Large", value: "lg" },
                  { title: "Full", value: "full" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
            }),
          ],
        },
      ],
      // ✅ do NOT require here (require conditionally at parent)
      validation: (Rule) => Rule.min(1),
    }),

    // defineField({
    //   name: "parentTeacherResourcesLink",
    //   title: "Parent/Teacher Resources Link (optional)",
    //   type: "reference",
    //   to: [{ type: "resource" }],
    // }),
  ],
});
