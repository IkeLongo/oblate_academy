// app/lib/resources/resourceTypeMap.ts
//
// Previously mapped URL slugs to category slugs. Categories are now deprecated —
// resources are organised exclusively by Collections (resourceCollection documents).
// This file is kept as a reference for any legacy URL redirects you may need to
// add to next.config.ts (e.g. /resources/worksheets → /resources/<collection-slug>).
//
// You can safely delete this file once legacy redirects are no longer needed.

export type ResourceTypeRule =
  | { kind: "collectionSlug"; value: string }
  | { kind: "tag"; value: string };

/**
 * Map legacy category-slug routes to their Collection equivalents.
 * Add an entry here for each old /resources/<categorySlug> URL you need
 * to keep working, pointing at the matching Collection slug in Sanity.
 *
 * Example:
 *   "coloring-pages": { kind: "collectionSlug", value: "coloring-pages" },
 */
export const legacyCategoryRedirects: Record<string, string> = {
  // "old-category-slug": "new-collection-slug",
};
