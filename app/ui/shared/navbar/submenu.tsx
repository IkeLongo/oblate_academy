"use client";

import { GradeAnchorLink } from "@/app/ui/components/nav/GradeAnchorLink";
import type { GradeKey } from "@/app/types/types";

interface SubmenuProps {
  items: { name: string; href: string }[];
  open: boolean;
  onItemClick?: () => void;
}

function itemToGrade(itemName: string): GradeKey | null {
  if (itemName === "Kinder - 2nd Grade") return "gk_2";
  if (itemName === "3rd - 5th Grade") return "g3_5";
  return null;
}

export default function Submenu({ items, open, onItemClick }: SubmenuProps) {
  if (!open) return null;

  return (
    <div className="absolute left-0 mt-2 min-w-[200px] bg-white border border-gray-200 rounded shadow-lg z-50">
      {items.map((item) => {
        let hoverClass = "";
        if (item.name === "Kinder - 2nd Grade") {
          hoverClass = "hover:bg-blue-100 hover:text-blue-700 hover:font-bold";
        } else if (item.name === "3rd - 5th Grade") {
          hoverClass = "hover:bg-green-100 hover:text-green-600 hover:font-bold";
        } else {
          hoverClass = "hover:bg-gray-100 hover:text-green-600 hover:font-bold";
        }

        const grade = itemToGrade(item.name);

        // If it’s one of the grade items, use GradeAnchorLink
        if (grade) {
          return (
            <GradeAnchorLink
              key={item.name}
              grade={grade}
              className={`block px-4 py-2 text-md text-black ${hoverClass}`}
              onClick={onItemClick}
            >
              {item.name}
            </GradeAnchorLink>
          );
        }

        // Fallback (if you ever add more submenu items later)
        return (
          <a
            key={item.name}
            href={item.href}
            className={`block px-4 py-2 text-md text-black ${hoverClass}`}
            onClick={onItemClick}
          >
            {item.name}
          </a>
        );
      })}
    </div>
  );
}
