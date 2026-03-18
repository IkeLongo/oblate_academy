// sanity/schemaTypes/documents/resourceCollection.ts
import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";
import { IconKeyInput } from "@/sanity/components/IconKeyInput";
import {
  BookOpen, Users, FileText, Video, ClipboardCheck, Lightbulb, Sparkles,
  HandHeart, GraduationCap, Printer, Palette, NotebookPen, Puzzle, FileCog,
  House, MessagesSquare, Crosshair, Magnet, Star, Signal, TableOfContents,
  TrendingUp, ListChecks, BriefcaseBusiness, School, MessageCircleQuestionMark,
  Smile, Pencil,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  lesson: BookOpen, book: BookOpen, users: Users, parents: Users, family: Users,
  file: FileText, video: Video, check: ClipboardCheck, assessment: ClipboardCheck,
  tips: Lightbulb, bulb: Lightbulb, sparkles: Sparkles, handheart: HandHeart,
  pray: HandHeart, graduation: GraduationCap, print: Printer, palette: Palette,
  notebook: NotebookPen, puzzle: Puzzle, filecog: FileCog, house: House,
  discussion: MessagesSquare, crosshair: Crosshair, target: Crosshair,
  magnet: Magnet, star: Star, signal: Signal, tableofcontents: TableOfContents,
  trendingup: TrendingUp, listchecks: ListChecks, briefcasebusiness: BriefcaseBusiness,
  school: School, question: MessageCircleQuestionMark, smile: Smile, pencil: Pencil,
};

export const resourceCollection = defineType({
  name: "resourceCollection",
  title: "Resource Collection",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "isActive",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "iconKey",
      title: "Icon",
      type: "string",
      components: {
        input: IconKeyInput,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "grade",
      title: "Grade Applicability",
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
      name: "description",
      title: "Description (optional)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    // defineField({
    //   name: "layout",
    //   title: "How should this collection display?",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "List resources directly", value: "direct" },
    //       { title: "List groups first, then resources", value: "grouped" },
    //     ],
    //     layout: "radio",
    //   },
    //   initialValue: "direct",
    //   validation: (R) => R.required(),
    // }),
    // defineField({
    //   name: "items",
    //   title: "Resources",
    //   type: "array",
    //   of: [{ type: "reference", to: [{ type: "resource" }] }],
    //   hidden: ({ parent }) => parent?.layout !== "direct",
    //   description: "Optional curated ordering for direct collections.",
    // }),
    // defineField({
    //   name: "groups",
    //   title: "Groups",
    //   type: "array",
    //   of: [{ type: "reference", to: [{ type: "resourceGroup" }] }],
    //   hidden: ({ parent }) => parent?.layout !== "grouped",
    //   validation: (Rule) =>
    //     Rule.custom((groups, ctx: any) => {
    //       if (ctx?.parent?.layout !== "grouped") return true;
    //       if (!groups || groups.length === 0) return "Add at least one group.";
    //       return true;
    //     }),
    //   description: "Add the sub-pages that appear before listing resources.",
    // }),
    defineField({
      name: "tags",
      title: "Tags (optional)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "grade", iconKey: "iconKey" },
    prepare({ title, subtitle, iconKey }) {
      const g = subtitle === "k2" ? "K–2" : subtitle === "g3_5" ? "3–5" : "All";
      const media = (iconKey && ICON_MAP[iconKey]) ? ICON_MAP[iconKey] : PackageIcon;
      return { title, subtitle: g, media };
    },
  },
});
