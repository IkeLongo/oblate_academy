"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { GradeKey } from "@/app/types/types";
import { setSelectedGrade } from "@/app/lib/gradeSelection";

function scrollToIdWithOffset(id: string, offsetPx: number) {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const targetY = window.scrollY + rect.top - offsetPx;

  window.scrollTo({ top: targetY, behavior: "smooth" });
}

function isMobile() {
  return window.matchMedia("(max-width: 767px)").matches;
}

export function GradeAnchorLink({
  grade,
  children,
  className,
  onClick,
}: {
  grade: GradeKey;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Link
      href="/#grade-content"
      className={className}
      onClick={(e) => {
        onClick?.();
        setSelectedGrade(grade);

        const targetId = "grade-content";

        if (pathname === "/") {
          e.preventDefault();

          if (isMobile()) {
            // ✅ add padding for sticky header, tune this number
            scrollToIdWithOffset(targetId, 60);
          } else {
            document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          router.push(`/#${targetId}`);
        }
      }}
    >
      {children}
    </Link>
  );
}
