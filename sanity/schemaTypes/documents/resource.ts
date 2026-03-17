// sanity/schemaTypes/documents/resource.ts
import { defineField, defineType } from "sanity";
import { DocumentPdfIcon, ImageIcon, LinkIcon, VideoIcon, TextIcon } from "@sanity/icons";

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
          { title: "All Grades", value: "all" },
          { title: "Kinder - 2nd", value: "k2" },
          { title: "3rd - 5th", value: "g3_5" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "all",
    }),

    defineField({
      name: "kind",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "Image (WebP)", value: "image" },
          { title: "PDF File", value: "pdf" },
          { title: "External Link", value: "link" },
          { title: "Video Link", value: "video" },
          { title: "Rich Text Content", value: "richText" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "image",
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/webp",
      },
      hidden: ({ parent }) => parent?.kind !== "image",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const kind = (ctx.parent as any)?.kind;
          if (kind === "image" && !val) return "Image is required when Resource Type is Image.";
          return true;
        }),
    }),

    // Content fields (conditional)
    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",
      options: { accept: "application/pdf" },
      hidden: ({ parent }) => parent?.kind !== "pdf",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const kind = (ctx.parent as any)?.kind;
          if (kind === "pdf" && !val) return "PDF is required when Resource Type is PDF.";
          return true;
        }),
    }),

    defineField({
      name: "pdfThumbnail",
      title: "PDF Thumbnail (Page 1)",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.kind !== "pdf",
      description:
        "Upload a thumbnail image for the PDF (usually a screenshot/export of page 1). Used for card previews.",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const kind = (ctx.parent as any)?.kind;
          if (kind === "pdf" && !val) return "PDF Thumbnail is required when Resource Type is PDF.";
          return true;
        }),
    }),

    defineField({
      name: "url",
      title: "URL",
      type: "url",
      hidden: ({ parent }) => parent?.kind !== "link",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const kind = (ctx.parent as any)?.kind;
          if (kind === "link" && !val) {
            return "URL is required when Resource Type is Link.";
          }
          return true;
        }),
    }),

    defineField({
      name: "muxVideo",
      title: "Uploaded Video (Mux)",
      type: "mux.video",
      hidden: ({ parent }) => parent?.kind !== "video",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const parent = ctx.parent as any;
          if (parent?.kind !== "video") return true;

          const hasMux = !!val;
          const hasUrl = !!parent?.url;

          if (!hasMux && !hasUrl) return "Add a Mux video OR a URL.";
          return true;
        }),
    }),

    defineField({
      name: "body",
      title: "Rich Text Content",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      hidden: ({ parent }) => parent?.kind !== "richText",
      validation: (Rule) =>
        Rule.custom((val, ctx) => {
          const kind = (ctx.parent as any)?.kind;
          if (kind === "richText") {
            if (!Array.isArray(val) || val.length === 0)
              return "Rich Text Content is required when Resource Type is Rich Text.";
          }
          return true;
        }),
    }),

    // Which category does this resource belong to?
    defineField({
      name: "category",
      title: "Resource Category",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "Which category this resource belongs to (helps with filtering).",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "collections",
      title: "Resource Collections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "resourceCollection" }] }],
      description: "Choose one or more collections where this resource should appear.",
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "tags",
      title: "Tags (optional)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Helpful for filtering (ex: 'prayer', 'rosary', 'lent', 'worksheet').",
    }),
  ],

  // validation: (Rule) =>
  //   Rule.custom((doc: any) => {
  //     if (!doc?.belongsTo?._ref) return "Belongs To is required.";
  //     return true;
  //   }),

  preview: {
    select: {
      title: "title",
      kind: "kind",
      grade: "grade",
      category: "category.title",
      collections: "collections",
      pdfThumbnail: "pdfThumbnail",
      image: "image",
    },
    prepare({ title, kind, grade, category, collections, pdfThumbnail, image }) {
      const g =
        grade === "k2" ? "K–2" : grade === "g3_5" ? "3–5" : grade === "all" ? "All" : grade;

      const autoTitle = title || category || "Resource";

      const kindLabel =
        kind === "pdf"
          ? "PDF"
          : kind === "link"
          ? "Link"
          : kind === "video"
          ? "Video"
          : kind === "image"
          ? "Image"
          : "Text";

      const collectionCount = Array.isArray(collections) ? collections.length : 0;
      const collectionLabel =
        collectionCount === 0
          ? "No Collections"
          : collectionCount === 1
          ? "1 Collection"
          : `${collectionCount} Collections`;

      // Determine preview media
      let mediaPreview = null;
      if (kind === "pdf") {
        mediaPreview = pdfThumbnail || DocumentPdfIcon;
      } else if (kind === "image") {
        mediaPreview = image || ImageIcon;
      } else if (kind === "link") {
        mediaPreview = LinkIcon;
      } else if (kind === "video") {
        mediaPreview = VideoIcon;
      } else {
        mediaPreview = TextIcon;
      }

      return {
        title: autoTitle,
        subtitle: `${g} • ${kindLabel} • ${collectionLabel}`,
        media: mediaPreview,
      };
    },
  },
});
