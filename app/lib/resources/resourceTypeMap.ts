// app/lib/resources/resourceTypeMap.ts
export type ResourceTypeRule =
  | { kind: "categorySlug"; value: string }
  | { kind: "tag"; value: string };

export const resourceTypeMap: Record<string, ResourceTypeRule> = {
  // URL slug            // category.slug.current
  "coloring-pages": { kind: "categorySlug", value: "coloring-page" },
  "worksheets": { kind: "categorySlug", value: "worksheet" },
  "puzzles-and-games": { kind: "categorySlug", value: "puzzles-and-games" },
  "word-searches": { kind: "categorySlug", value: "word-search" },
  "how-to-teach-saints": { kind: "categorySlug", value: "how-to-teach-saints" },
  
  // examples for “general” resources later:
  // "prayers": { kind: "tag", value: "prayer" },
  // "rosary": { kind: "tag", value: "rosary" },
};
