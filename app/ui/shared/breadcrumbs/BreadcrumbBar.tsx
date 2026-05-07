"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Home,
  BookOpen,
  Heart,
  Church,
  Mail,
  Info,
  Shield,
  FileText,
} from "lucide-react";
import { resolveBreadcrumbs } from "@/app/lib/breadcrumbs";

function getCrumbIcon(label: string): React.ReactNode | null {
  if (label === "Home") return <Home size={15} strokeWidth={2.5} />;
  if (label.startsWith("Saints")) return <Church size={15} strokeWidth={2.5} />;
  if (label.startsWith("Virtues")) return <Heart size={15} strokeWidth={2.5} />;
  if (label === "Resources") return <BookOpen size={15} strokeWidth={2.5} />;
  if (label === "Catholic Faith") return <Church size={15} strokeWidth={2.5} />;
  if (label === "About") return <Info size={15} strokeWidth={2.5} />;
  if (label === "Contact") return <Mail size={15} strokeWidth={2.5} />;
  if (label === "Privacy Policy") return <Shield size={15} strokeWidth={2.5} />;
  if (label === "Terms & Conditions") return <FileText size={15} strokeWidth={2.5} />;
  return null;
}

export function BreadcrumbBar() {
  const pathname = usePathname();
  const crumbs = resolveBreadcrumbs(pathname);

  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full bg-blue-50 border-b border-blue-100 pt-[80px] navdesk:pt-0"
    >
      <div className="max-w-6xl mx-auto py-2.5">
        <ol className="flex flex-wrap items-center gap-0.5">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            const isClickable = !!crumb.href && !isLast;
            const icon = getCrumbIcon(crumb.label);

            return (
              <li key={i} className="flex items-center gap-0.5 min-w-0">
                {isClickable ? (
                  <Link
                    href={crumb.href!}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium font-fredoka text-blue-300 hover:text-blue-400 hover:bg-blue-100 transition-colors"
                  >
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span>{crumb.label}</span>
                  </Link>
                ) : (
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-fredoka min-w-0 ${
                      isLast
                        ? "font-semibold text-blue-400 bg-blue-100"
                        : "text-black/35"
                    }`}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span className="truncate">{crumb.label}</span>
                  </span>
                )}

                {!isLast && (
                  <ChevronRight
                    size={14}
                    className="text-blue-200 shrink-0 mx-0.5"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
