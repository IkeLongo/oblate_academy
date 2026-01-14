import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

const GRADES = ["k-2", "3-5"] as const;

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    saint: defineLocations({
      select: {
        title: "name",
        slug: "slug.current",
        enableK2: "enableGardeK_2",
        enable35: "enableGrade3_5",
      },
      resolve: (doc) => {
        const slug = doc?.slug;
        if (!slug) return { locations: [] };

        const enabledGrades = [
          doc?.enableK2 ? "k-2" : null,
          doc?.enable35 ? "3-5" : null,
        ].filter(Boolean) as Array<(typeof GRADES)[number]>;

        const gradesToUse = enabledGrades.length ? enabledGrades : [...GRADES];

        return {
          locations: [
            // ✅ detail pages
            ...gradesToUse.map((grade) => ({
              title: `${doc?.title || "Untitled"} — Grades ${grade}`,
              href: `/grade/${grade}/saints/${slug}`,
            })),

            // ✅ the “browse cards” entry point (adjust this path to your actual grade home route)
            ...gradesToUse.map((grade) => ({
              title: `Home — Grades ${grade}`,
              href: `/#grade-content`,
            })),
          ],
        };
      },
    }),

    virtue: defineLocations({
      select: {
        title: "name",
        slug: "slug.current",
        enableK2: "enableGardeK_2",
        enable35: "enableGrade3_5",
      },
      resolve: (doc) => {
        const slug = doc?.slug;
        if (!slug) return { locations: [] };

        const enabledGrades = [
          doc?.enableK2 ? "k-2" : null,
          doc?.enable35 ? "3-5" : null,
        ].filter(Boolean) as Array<(typeof GRADES)[number]>;

        const gradesToUse = enabledGrades.length ? enabledGrades : [...GRADES];

        return {
          locations: [
            // ✅ detail pages
            ...gradesToUse.map((grade) => ({
              title: `${doc?.title || "Untitled"} — Grades ${grade}`,
              href: `/grade/${grade}/virtues/${slug}`,
            })),

            // ✅ entry point
            ...gradesToUse.map((grade) => ({
              title: `Home — Grades ${grade}`,
              href: `/#grade-content`,
            })),
          ],
        };
      },
    }),
  },
};
