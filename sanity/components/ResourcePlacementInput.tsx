import React, { useEffect } from "react";
import { FormSetPatch, FormUnsetPatch, ObjectInputProps, set, unset, useClient } from "sanity";

/**
 * Custom input for the entire resourcePlacementInline object.
 * Watches the collection reference and auto-updates collectionLayout.
 */
export function ResourcePlacementInput(props: ObjectInputProps) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const value = props.value as any;

  const collectionRef = value?.collection?._ref;
  const currentLayout = value?.collectionLayout;

  useEffect(() => {
    console.log("⚡ useEffect triggered");

    if (!collectionRef) {
      // If no collection selected, clear layout and group
      if (currentLayout || value?.group) {
        props.onChange([
          unset(["collectionLayout"]),
          unset(["group"]),
        ]);
      }
      return;
    }

    // Fetch the collection's layout
    let cancelled = false;

    client
      .fetch<{ layout?: "direct" | "grouped" } | null>(
        `*[_type == "resourceCollection" && _id == $id][0]{ layout }`,
        { id: collectionRef }
      )
      .then((result) => {
        if (cancelled) return;

        const layout = result?.layout ?? "direct";

        // Also fetch and log groups for this collection
        client
          .fetch(
            `*[_type == "resourceGroup" && collection._ref == $collectionId]{ _id, title, collection }`,
            { collectionId: collectionRef }
          )

        // Only update if it changed
        if (layout !== currentLayout) {
          const patches = [set(layout, ["collectionLayout"])] as (FormSetPatch | FormUnsetPatch)[];

          // If switching to direct, clear group
          if (layout !== "grouped" && value?.group) {
            patches.push(unset(["group"]));
          }

          props.onChange(patches);
        } else {
        }
      })
      .catch((err) => {
      });

    return () => {
      cancelled = true;
    };
  }, [collectionRef, currentLayout, value?.group, client, props]);

  // Render the default object input
  return props.renderDefault(props);
}
