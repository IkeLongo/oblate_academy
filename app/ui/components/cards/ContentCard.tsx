import React from "react";
import Link from "next/link";
import type { ContentCardProps } from "@/app/types/types";

export function ContentCard({ title, href, imageSrc, imageAlt, color }: ContentCardProps) {
  return (
    <Link
      href={href}
      className="group block w-[260px] shrink-0 rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
    >
      <div
        className={`
          overflow-hidden rounded-2xl border-2 ${color.border} ${color.bg}
          shadow-sm transition group-hover:shadow-md
          flex flex-col
          h-[260px]  /* ✅ one consistent card height */
        `}
      >
        {/* ✅ flexible image area */}
        <div className="flex-1 min-h-0 bg-slate-100">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* ✅ title can grow to 1/2/3+ lines */}
        <h4 className={`border-t-2 ${color.border} ${color.bg} px-4 py-3 text-center font-extrabold ${color.text}`}>
          {title}
        </h4>
      </div>
    </Link>
  );
}
