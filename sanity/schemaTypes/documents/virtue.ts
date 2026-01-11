// /sanity/schemaTypes/documents/virtue.ts
import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const virtue = defineType({
  name: "virtue",
  title: "Virtue",
  type: "document",
  icon: SparklesIcon,
  groups: [
    { name: "shared", title: "Shared" },
    { name: "k-2", title: "K–2" },
    { name: "3-5", title: "3–5" },
  ],
  fields: [
    // Shared identity fields...
    defineField({ name: "name", type: "string", group: "shared", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug", group: "shared", options: { source: "name" }, validation: (R) => R.required() }),
    defineField({
      name: "cardImage",
      type: "image",
      group: "shared",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text", validation: (R) => R.required().max(120) }],
      validation: (R) => R.required(),
    }),
    defineField({ name: "isActive", type: "boolean", group: "shared", initialValue: true }),

    // ✅ Enable toggles
    defineField({
      name: "enableGradeK_2",
      title: "Enable K–2 Version",
      type: "boolean",
      group: "shared",
      initialValue: true,
    }),
    defineField({
      name: "enableGrade3_5",
      title: "Enable 3–5 Version",
      type: "boolean",
      group: "shared",
      initialValue: false,
    }),

    // K–2 variant (optional, but required if enabled)
    defineField({
      name: "gk_2",
      title: "Kinder - 2nd Grade Page",
      type: "gradeVariant",
      group: "k-2",
      hidden: ({ parent }) => !parent?.enableGradeK_2,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx.parent as any)?.enableGradeK_2;
          if (!enabled) return true;
          if (!val) return "K–2 is enabled but its content is missing.";
          const overview = (val as any)?.overview;
          if (!Array.isArray(overview) || overview.length === 0) {
            return "K–2 overview is required when K–2 is enabled.";
          }
          return true;
        }),
    }),

    // 3–5 variant (optional, but required if enabled)
    defineField({
      name: "g3_5",
      title: "3rd - 5th Grade Page",
      type: "gradeVariant",
      group: "3-5",
      hidden: ({ parent }) => !parent?.enableGrade3_5,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx.parent as any)?.enableGrade3_5;
          if (!enabled) return true;
          if (!val) return "3–5 is enabled but its content is missing.";
          const overview = (val as any)?.overview;
          if (!Array.isArray(overview) || overview.length === 0) {
            return "3–5 overview is required when 3–5 is enabled.";
          }
          return true;
        }),
    }),
  ],
});
