// /sanity/structure.ts
import type { StructureResolver } from "sanity/structure";
import {
  UsersIcon,
  SparklesIcon,
  PackageIcon,
  BookIcon,
  ListIcon,
  FolderIcon,
} from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Oblate Academy")
    .items([
      // Saints
      S.listItem()
        .title("Saints")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("Saints")
            .items([
              S.listItem()
                .title("All Saints")
                .icon(ListIcon)
                .child(S.documentTypeList("saint").title("All Saints")),

              S.listItem()
                .title("Saints (K–2)")
                .child(
                  S.documentList()
                    .title("Saints (K–2)")
                    .filter('_type == "saint" && defined(k2) && isActive == true')
                ),

              S.listItem()
                .title("Saints (3–5)")
                .child(
                  S.documentList()
                    .title("Saints (3–5)")
                    .filter('_type == "saint" && defined(g3_5) && isActive == true')
                ),
            ])
        ),

      // Virtues
      S.listItem()
        .title("Virtues")
        .icon(SparklesIcon)
        .child(
          S.list()
            .title("Virtues")
            .items([
              S.listItem()
                .title("All Virtues")
                .icon(ListIcon)
                .child(S.documentTypeList("virtue").title("All Virtues")),

              S.listItem()
                .title("Virtues (K–2)")
                .child(
                  S.documentList()
                    .title("Virtues (K–2)")
                    .filter('_type == "virtue" && defined(k2) && isActive == true')
                ),

              S.listItem()
                .title("Virtues (3–5)")
                .child(
                  S.documentList()
                    .title("Virtues (3–5)")
                    .filter('_type == "virtue" && defined(g3_5) && isActive == true')
                ),
            ])
        ),

      S.divider(),

      // Resources
      S.listItem()
        .title("Resource Library")
        .icon(BookIcon)
        .child(
          S.list()
            .title("Resources")
            .items([
              S.listItem()
                .title("All Resources")
                .icon(ListIcon)
                .child(S.documentTypeList("resource").title("All Resources")),

              S.listItem()
                .title("Resources (K–2)")
                .child(
                  S.documentList()
                    .title("Resources (K–2)")
                    .filter('_type == "resource" && grade == "k2" && isActive == true')
                ),

              S.listItem()
                .title("Resources (3–5)")
                .child(
                  S.documentList()
                    .title("Resources (3–5)")
                    .filter('_type == "resource" && grade == "g3_5" && isActive == true')
                ),
            ])
        ),

      // Resource Collection
      // Collections (conditionally show Groups if layout === "grouped")
      S.listItem()
        .title("Resource Collections")
        .icon(PackageIcon)
        .child(
          S.documentTypeList("resourceCollection")
            .title("Resource Collections")
            .child((collectionId) =>
              S.document().schemaType("resourceCollection").documentId(collectionId)
            )
        ),

      S.divider(),

      // Everything else (optional)
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["saint", "virtue", "category", "resourceCollection", "resourceGroup", "resource"].includes(item.getId()!)
      ),
    ]);
