import React, { useCallback } from "react";
import { TextInput } from "@sanity/ui";
import { PatchEvent, set, type StringInputProps, useFormValue } from "sanity";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function LabelWithAutoSlug(props: StringInputProps) {
  const { value, onChange, elementProps, path } = props;

  // path points to .../label, so sibling slug is .../slug
  const parentPath = path.slice(0, -1);
  const slugPath = [...parentPath, "slug"];

  // ✅ safely read the current slug value from the form state
  const existingSlug = useFormValue(slugPath) as string | undefined;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextLabel = e.currentTarget.value;

      const patches = [set(nextLabel)]; // updates label field

      // ✅ set slug only once (first time) if empty
      if (!existingSlug && nextLabel) {
        patches.push(set(slugify(nextLabel), slugPath)); // absolute path patch
      }

      onChange(PatchEvent.from(patches));
    },
    [onChange, existingSlug, slugPath]
  );

  return (
    <TextInput
      {...elementProps}
      value={value ?? ""}
      onChange={handleChange}
      placeholder='Example: "Coloring Pages"'
    />
  );
}
