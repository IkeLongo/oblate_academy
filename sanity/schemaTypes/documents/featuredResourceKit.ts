import { defineField, defineType } from "sanity";
import { IconKeyInput } from "../../components/IconKeyInput";
import { ColorThemeInput } from "../../components/ColorThemeInput";
import { StarIcon, TextIcon } from "@sanity/icons";
import { HighlightPreview } from "../../components/HighlightPreview";

export const featuredResourceKit = defineType({
  name: "featuredResourceKit",
  title: "Featured Resource Kit",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Short description for the kit, shown in the featured section.",
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: "isActive",
      title: "Show on Website",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "monthLabel",
      title: "Month Label",
      type: "string",
      description: 'Example: "March 2026"',
    }),

    defineField({
      name: "focusType",
      title: "Focus Type",
      type: "string",
      options: {
        list: [
          { title: "Saint", value: "saint" },
          { title: "Virtue", value: "virtue" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "saint",
      title: "Featured Saint",
      type: "reference",
      to: [{ type: "saint" }],
      hidden: ({ parent }) => parent?.focusType !== "saint",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const focusType = (ctx.parent as any)?.focusType;
          if (focusType === "saint" && !val) return "A saint is required.";
          return true;
        }),
      }),

    defineField({
      name: "virtue",
      title: "Featured Virtue",
      type: "reference",
      to: [{ type: "virtue" }],
      hidden: ({ parent }) => parent?.focusType !== "virtue",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const focusType = (ctx.parent as any)?.focusType;
          if (focusType === "virtue" && !val) return "A virtue is required.";
          return true;
        }),
    }),

    defineField({
      name: "intro",
      title: "Intro / Biography",
      type: "array",
      of: [{ type: "block" }],
      description: "Short intro shown above the featured resources.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        defineField({
          name: "highlight",
          type: "object",
          fields: [
            { name: "text", type: "string", title: "Text", validation: (Rule) => Rule.required() },
            {
              name: "icon",
              type: "string",
              title: "Icon",
              description: "Icon name (e.g. lesson, printable, video)",
              components: { input: IconKeyInput },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "text",
              iconKey: "icon",
            },
            // @ts-expect-error Sanity custom preview component
            component: HighlightPreview,
          },
        })
      ],
      description: "Key highlights for this kit (e.g. lesson plan, printables, video)",
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "includedItems",
      title: "Included Items",
      icon: TextIcon,
      type: "array",
      of: [
        defineField({
          name: "item",
          type: "object",
          fields: [
            { name: "text", type: "string", title: "Text", validation: (Rule) => Rule.required() },
          ],
        })
      ],
      description: "List of items included in the kit.",
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "resources",
      title: "Featured Resources",
      type: "array",
      of: [{ type: "reference", to: [{ type: "resource" }] }],
      validation: (Rule) => Rule.required().min(3).max(4),
      description: "Choose 3–4 resources for this kit.",
    }),

    defineField({
      name: "coverImage",
      title: "Cover Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "Explore the Kit",
    }),

    defineField({
      name: "colorTheme",
      title: "Color Theme",
      type: "string",
      initialValue: "green",
      description: "Choose the color theme for this resource kit.",
      components: { input: ColorThemeInput },
    }),

    defineField({
      name: "startsAt",
      title: "Starts At (optional)",
      type: "datetime",
    }),

    defineField({
      name: "endsAt",
      title: "Ends At (optional)",
      type: "datetime",
    }),
  ],
  validation: (Rule) =>
  Rule.custom(async (_, context) => {
    const { document, getClient } = context;
    if (!document?.isActive) return true;

    const client = getClient({ apiVersion: "2023-01-01" });

    const rawId = document._id.replace(/^drafts\./, "");
    const existing = await client.fetch(
      `count(*[_type == "featuredResourceKit" && isActive == true && !(_id in [$id, $draftId])])`,
      { id: rawId, draftId: `drafts.${rawId}` }
    );

    if (existing > 0) {
      return "Only one Featured Resource Kit can be active at a time.";
    }

    return true;
  }),

  preview: {
    select: {
      title: "title",
      monthLabel: "monthLabel",
      isActive: "isActive",
      media: "coverImage",
    },
    prepare({ title, monthLabel, isActive, media }) {
      return {
        title: title || "Featured Resource Kit",
        subtitle: `${monthLabel || "No month"} • ${isActive ? "Active" : "Inactive"}`,
        media,
      };
    },
  },
});