/* eslint-disable @typescript-eslint/no-explicit-any */
// app/ui/components/resources/ResourceCardsFilter.tsx
"use client";
import React, { useState, useMemo } from "react";
import { ResourceFocusCards } from "./ResourceFocusCards";
import { Label } from "@/app/ui/components/input/Label";
import { Input } from "@/app/ui/components/input/Input";
import { LabelInputContainer } from "@/app/ui/components/input/LabelInputContainer";

export function ResourceCardsFilter({ resources }: { resources: any[] }) {
  const [filter, setFilter] = useState("");

  // Filter by title, saint, virtue, or collection (case-insensitive)
  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return resources;
    return resources.filter((r) => {
      const title = r.title || "";
      const saint = r.saint?.name || "";
      const virtue = r.virtue?.name || "";
      const collection = r.collection?.title || "";
      return (
        title.toLowerCase().includes(f) ||
        saint.toLowerCase().includes(f) ||
        virtue.toLowerCase().includes(f) ||
        collection.toLowerCase().includes(f)
      );
    });
  }, [resources, filter]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-w-xs mb-10 self-start md:self-end">
        <LabelInputContainer>
          <Label htmlFor="filter">Filter by name</Label>
          <Input
            id="filter"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search..."
            type="text"
          />
        </LabelInputContainer>
      </div>
      <ResourceFocusCards resources={filtered} />
    </div>
  );
}