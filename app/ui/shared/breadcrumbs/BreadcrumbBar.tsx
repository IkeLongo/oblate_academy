"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { resolveBreadcrumbs } from "@/app/lib/breadcrumbs";

export function BreadcrumbBar() {
  const pathname = usePathname();
  const crumbs = resolveBreadcrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-white border-b border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-6 py-2">
        <ol className="flex flex-wrap items-center gap-1">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={i} className="flex items-center gap-1">
                {isLast || !crumb.href ? (
                  <span
                    className="text-xs font-poppins text-black/40"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-xs font-poppins text-blue-300 hover:text-blue-400 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
                {!isLast && (
                  <span className="text-xs text-gray-300 select-none" aria-hidden="true">
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
