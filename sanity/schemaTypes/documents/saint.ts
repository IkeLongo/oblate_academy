// saint.ts (show only the relevant parts)
import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const saint = defineType({
  name: "saint",
  title: "Saint",
  type: "document",
  icon: SparklesIcon,
  groups: [
    { name: "shared", title: "Shared" },
    { name: "k2", title: "K–2" },
    { name: "g3_5", title: "3–5" },
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
      fields: [{ name: "alt", type: "string", title: "Alt Text", validation: (R: any) => R.required().max(120) }],
      validation: (R) => R.required(),
    }),
    defineField({ name: "isActive", type: "boolean", group: "shared", initialValue: true }),

    // ✅ Enable toggles
    defineField({
      name: "enableK2",
      title: "Enable K–2 Version",
      type: "boolean",
      group: "shared",
      initialValue: true,
    }),
    defineField({
      name: "enableG35",
      title: "Enable 3–5 Version",
      type: "boolean",
      group: "shared",
      initialValue: false,
    }),

    // K–2 variant (optional, but required if enabled)
    defineField({
      name: "k2",
      title: "Kinder - 2nd Grade Page",
      type: "gradeVariant",
      group: "k2",
      hidden: ({ parent }) => !parent?.enableK2,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx.parent as any)?.enableK2;
          if (!enabled) return true;        // not enabled → no requirement
          if (!val) return "K–2 content is enabled but missing.";
          return true;
        }),
    }),

    // 3–5 variant (optional, but required if enabled)
    defineField({
      name: "g3_5",
      title: "3rd - 5th Grade Page",
      type: "gradeVariant",
      group: "g3_5",
      hidden: ({ parent }) => !parent?.enableG35,
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const enabled = (ctx.parent as any)?.enableG35;
          if (!enabled) return true;
          if (!val) return "3–5 content is enabled but missing.";
          return true;
        }),
    }),
  ],
});

