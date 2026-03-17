// sanity/schemaTypes/objects/resourcePlacementInline.ts
import { defineField, defineType } from "sanity";
import { ResourcePlacementInput } from "@/sanity/components/ResourcePlacementInput";
import { PackageIcon, FolderIcon } from "@sanity/icons";

export const resourcePlacementInline = defineType({
  name: "resourcePlacementInline",
  title: "Placement",
  type: "object",
  icon: PackageIcon,
  components: {
    input: ResourcePlacementInput,
  },
  fields: [
    // 1) Choose the target type first
    defineField({
      name: "targetType",
      title: "Place this resource under",
      type: "string",
      options: {
        list: [
          { title: "Saint", value: "saint" },
          { title: "Virtue", value: "virtue" },
          { title: "Collection", value: "collection" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    // 2) Conditional reference fields (only show the right one)
    defineField({
      name: "saint",
      title: "Saint",
      type: "reference",
      to: [{ type: "saint" }],
      hidden: ({ parent }) => parent?.targetType !== "saint",
      validation: (R) =>
        R.custom((val, ctx) => {
          if ((ctx.parent as any)?.targetType === "saint" && !val?._ref) {
            return "Select a saint.";
          }
          return true;
        }),
    }),
    defineField({
      name: "virtue",
      title: "Virtue",
      type: "reference",
      to: [{ type: "virtue" }],
      hidden: ({ parent }) => parent?.targetType !== "virtue",
      validation: (R) =>
        R.custom((val, ctx) => {
          if ((ctx.parent as any)?.targetType === "virtue" && !val?._ref) {
            return "Select a virtue.";
          }
          return true;
        }),
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{ type: "resourceCollection" }],
      hidden: ({ parent }) => parent?.targetType !== "collection",
      validation: (R) =>
        R.custom((val, ctx) => {
          if ((ctx.parent as any)?.targetType === "collection" && !val?._ref) {
            return "Select a collection.";
          }
          return true;
        }),
    }),
    defineField({
      name: "collectionLayout",
      title: "Collection Layout (auto)",
      type: "string",
      readOnly: true,
      hidden: true,
      // initialValue: "grouped",
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "reference",
      to: [{ type: "resourceGroup" }],
      hidden: ({ parent }) => {
        const isHidden = parent?.targetType !== "collection" || parent?.collectionLayout !== "grouped";
        return isHidden;
      },
      options: {
        filter: ({ parent }: any) => {
          const collectionId = parent?.collection?._ref;
          
          if (!collectionId) {
            return { filter: "_id == $none", params: { none: "nope" } };
          }
          
          const filterQuery = 'references($collectionId)';
          
          return {
            filter: filterQuery,
            params: { collectionId },
          };
        },
      },
      validation: (R) =>
        R.custom((val, ctx) => {
          const p = ctx.parent as any;
          if (p?.targetType !== "collection") return true;
          if (p?.collectionLayout === "grouped" && !val?._ref) return "Select a group.";
          return true;
        }),
    }),
    defineField({
      name: "gradeOverride",
      title: "Grade override (optional)",
      type: "string",
      options: {
        list: [
          { title: "Inherit from Resource", value: "inherit" },
          { title: "All Grades", value: "all" },
          { title: "Kinder - 2nd", value: "k2" },
          { title: "3rd - 5th", value: "g3_5" },
        ],
        layout: "radio",
      },
      initialValue: "inherit",
    }),

    defineField({
      name: "isActive",
      type: "boolean",
      initialValue: true,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((val: any) => {
      if (!val) return true;

      if (!val.targetType) return "Choose Saint, Virtue, or Collection.";

      if (val.targetType === "saint" && !val.saint?._ref) return "Select a saint.";
      if (val.targetType === "virtue" && !val.virtue?._ref) return "Select a virtue.";
      if (val.targetType === "collection" && !val.collection?._ref) return "Select a collection.";

      return true;
    }),
  preview: {
    select: {
      targetType: "targetType",
      saintName: "saint.name",
      virtueTitle: "virtue.title",
      collectionTitle: "collection.title",
      groupTitle: "group.title",
      saintMedia: "saint.cardImage",
      virtueMedia: "virtue.cardImage",
      collectionMedia: "collection.heroImage",
    },
    prepare({ targetType, saintName, virtueTitle, collectionTitle, groupTitle, saintMedia, virtueMedia, collectionMedia }) {
      let title: string;
      let subtitle: string;
      let media;

      if (targetType === "saint") {
        title = saintName || "Unnamed Saint";
        subtitle = "Saint";
        media = saintMedia;
      } else if (targetType === "virtue") {
        title = virtueTitle || "Unnamed Virtue";
        subtitle = "Virtue";
        media = virtueMedia;
      } else if (targetType === "collection") {
        // If there's a group, show the group; otherwise show the collection
        if (groupTitle) {
          title = collectionTitle + " - " + groupTitle;
          subtitle = "Collection - Group";
          media = FolderIcon;
        } else {
          title = collectionTitle || "Unnamed Collection";
          subtitle = "Collection";
          media = PackageIcon;
        }
      } else {
        title = "Placement";
        subtitle = "Unknown";
        media = undefined;
      }

      return {
        title,
        subtitle,
        media,
      };
    },
  },
});
