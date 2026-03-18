"use client";

import Link from "next/link";
import { HubIcon } from "./hubIcons";
import type { HubTheme } from "@/app/ui/theme/resourceHubTheme";

type Row = {
  title: string;
  iconKey: string;
  slug?: string;
  comingSoon?: boolean;
};

export function ResourceRowLink({ row, theme }: { row: Row; theme: HubTheme }) {
  const href = row.comingSoon || !row.slug ? null : `/resources/${row.slug}`;
  const disabled = row.comingSoon || !href;

  const content = (
    <div
      className={[
        "flex items-center gap-2 rounded-lg px-3 py-2 text-md font-medium",
        theme.pillBg,
        theme.pillFg,
        disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-90 transition",
      ].join(" ")}
    >
      <HubIcon iconKey={row.iconKey} className="h-4 w-4" color={theme.iconColor} />
      <span className="truncate">{row.title}</span>
      {row.comingSoon ? (
        <span className="ml-auto text-[11px] opacity-80">Coming soon</span>
      ) : null}
    </div>
  );

  if (disabled) return <div aria-disabled="true">{content}</div>;

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
