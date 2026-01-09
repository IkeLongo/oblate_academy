import React from "react";
import Link from "next/link";

type ContentCardProps = {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  color: { text: string; border: string; bg: string };
};

export function ContentCard({ title, href, imageSrc, imageAlt, color }: ContentCardProps) {
  return (
    <Link
      href={href}
      className={`group block w-[260px] shrink-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 rounded-2xl`}
    >
      <div className={`overflow-hidden rounded-2xl border-2 ${color.border} ${color.bg} shadow-sm transition group-hover:shadow-md`}>
        <div className="aspect-[16/9] w-full bg-slate-100">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <h4 className={`border-t-2 ${color.border} ${color.bg} px-4 py-3 text-center font-extrabold ${color.text}`}>
          {title}
        </h4>
      </div>
    </Link>
  );
}
