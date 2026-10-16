// sanity/schemaTypes/objects/featuredResourceItem.ts
import { defineField, defineType } from "sanity";
import { DocumentPdfIcon, ImageIcon, LinkIcon, VideoIcon, TextIcon } from "@sanity/icons";

export const featuredResourceItem = defineType({
  name: "featuredResourceItem",
  title: "Featured Resource",
  type: "object",
  fields: [
    defineField({
      name: "resource",
      title: "Resource",
      type: "reference",
      to: [{ type: "resource" }],
      description: "Choose an existing resource. Its title, content and link come from the resource itself.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredTitle",
      title: "Homepage Title (optional)",
      type: "string",
      description: "Optional homepage title. Leave blank to use the resource's normal display title.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 2,
      description:
        "Optional homepage-specific supporting copy shown under the title. Leave blank to show only the title.",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      featuredTitle: "featuredTitle",
      resourceTitle: "resource.title",
      resourceType: "resource.resourceType",
      subject: "resource.subject",
      kind: "resource.kind",
      description: "description",
      image: "resource.image",
      pdfThumbnail: "resource.pdfThumbnail",
    },
    prepare({ featuredTitle, resourceTitle, resourceType, subject, kind, description, image, pdfThumbnail }) {
      // Same fallback as the resource schema preview
      const displayTitle =
        featuredTitle?.trim() ||
        resourceTitle ||
        (resourceType && subject ? `${resourceType} – ${subject}` : resourceType || subject || "Resource");

      const kindLabel =
        kind === "pdf" ? "PDF" : kind === "link" ? "Link" : kind === "video" ? "Video" : kind === "image" ? "Image" : "Text";

      const media =
        kind === "pdf"
          ? pdfThumbnail || DocumentPdfIcon
          : kind === "image"
          ? image || ImageIcon
          : kind === "link"
          ? LinkIcon
          : kind === "video"
          ? VideoIcon
          : TextIcon;

      return {
        title: displayTitle,
        subtitle: description ? `${kindLabel} • ${description}` : kindLabel,
        media,
      };
    },
  },
});
