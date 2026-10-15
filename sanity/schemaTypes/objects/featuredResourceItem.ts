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
      name: "blurb",
      title: "Blurb (optional)",
      type: "text",
      rows: 2,
      description:
        "Optional homepage-specific context explaining why this resource is being highlighted. Leave blank to show only the resource.",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "resource.title",
      resourceType: "resource.resourceType",
      subject: "resource.subject",
      kind: "resource.kind",
      blurb: "blurb",
      image: "resource.image",
      pdfThumbnail: "resource.pdfThumbnail",
    },
    prepare({ title, resourceType, subject, kind, blurb, image, pdfThumbnail }) {
      // Same fallback as the resource schema preview
      const displayTitle =
        title ||
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
        subtitle: blurb ? `${kindLabel} • ${blurb}` : kindLabel,
        media,
      };
    },
  },
});
