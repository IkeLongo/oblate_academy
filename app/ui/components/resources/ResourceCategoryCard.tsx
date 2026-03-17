"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { HubIcon } from "./hubIcons";
import { ResourceRowLink } from "./ResourcesRowLink";
import type { HubTheme } from "@/app/ui/theme/resourceHubTheme";

type Card = {
  title: string;
  description: string;
  iconKey: string;
  themeKey: string;
  rows: any[];
  buttonLabel?: string | null;
  buttonLinkType: "href" | "collection" | "none";
  buttonHref?: string | null;
  buttonCollection?: { slug?: { current?: string } | null; slug?: any } | null;
};

function resolveButtonHref(card: Card) {
  if (!card.buttonLabel) return null;
  if (card.buttonLinkType === "none") return null;
  if (card.buttonLinkType === "href") return card.buttonHref || null;

  if (card.buttonLinkType === "collection") {
    const slug = (card as any)?.buttonCollection?.slug?.current || (card as any)?.buttonCollection?.slug;
    if (!slug) return null;
    return `/parent-teacher/collections/${slug}`;
  }

  return null;
}

export function ResourceCategoryCard({ card, theme }: { card: Card; theme: HubTheme }) {
  const btnHref = resolveButtonHref(card);
  const btnDisabled = !!card.buttonLabel && !btnHref;

  // Debug logging for Sanity Studio preview mode
  console.log("🔍 ResourceCategoryCard - card data:", {
    title: card.title,
    themeKey: card.themeKey,
    iconKey: card.iconKey,
    theme: theme ? "defined" : "UNDEFINED"
  });

  // Defensive checks for iconKey and theme
  if (!theme) {
    console.warn("ResourceCategoryCard: theme is undefined", card);
  }
  if (!card.iconKey) {
    console.warn("ResourceCategoryCard: iconKey is undefined", card);
  }

  const button = card.buttonLabel ? (
    btnHref ? (
      btnHref.startsWith("http") ? (
        <a href={btnHref} target="_blank" rel="noreferrer">
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: theme?.buttonBg || "#2563eb",
              color: theme?.buttonFg || "#ffffff",
              "&:hover": { backgroundColor: theme?.buttonBg || "#2563eb" },
            }}
          >
            {card.buttonLabel}
          </Button>
        </a>
      ) : (
        <Link href={btnHref}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: theme?.buttonBg || "#2563eb",
              color: theme?.buttonFg || "#ffffff",
              "&:hover": { backgroundColor: theme?.buttonBg || "#2563eb" },
            }}
          >
            {card.buttonLabel}
          </Button>
        </Link>
      )
    ) : (
      <Button
        fullWidth
        variant="contained"
        disabled={btnDisabled}
        sx={{
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 700,
          backgroundColor: theme?.buttonBg || "#2563eb",
          color: theme?.buttonFg || "#ffffff",
          opacity: 0.6,
        }}
      >
        {card.buttonLabel}
      </Button>
    )
  ) : null;

  return (
    <div className={["rounded-2xl border bg-white p-6 shadow-sm", theme?.border || "border-blue-100"].join(" ")}> 
      <div className="flex flex-col items-center text-center">
        <div className={["grid h-12 w-12 place-items-center rounded-full", theme?.iconBg || "bg-blue-100"].join(" ")}> 
          <HubIcon iconKey={card.iconKey || "smile"} className={["h-6 w-6", theme?.iconFg || "text-blue-700"].join(" ")} color={theme?.iconColor || "#1d4ed8"} />
        </div>

        <h3 className={["mt-3 text-xl font-extrabold", theme?.titleFg || "text-blue-700"].join(" ")}>
          {card.title}
        </h3>
        <p className="mt-2 mx-4 text-md text-slate-600">{card.description}</p>
      </div>

      <div className="mt-5 space-y-2">
        {card.rows?.map((row: any) => (
          <ResourceRowLink key={row._key || row.label} row={row} theme={theme} />
        ))}
      </div>

      {button ? <div className="mt-5">{button}</div> : null}
    </div>
  );
}
