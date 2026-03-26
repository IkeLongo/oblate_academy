/**
 * Color palette system for Featured Resource Kit components.
 *
 * Each palette defines 8 semantic color roles so that every shade used
 * across FeaturedResourceKit, FeaturedResourceKitMain, and DownloadAllButton
 * automatically follows the selected theme.
 *
 * pageBg      — very light tint, used for the page background gradient
 * bgSoft      — light tint, used for card/section surface backgrounds
 * bgMedium    — medium tint, used for inner card backgrounds ("What's Included")
 * accent      — mid-saturation color for labels, links, icons, and list markers
 * heading     — dark saturated color for headings and strong emphasis text
 * body        — body/list text color (slightly lighter than heading)
 * button      — primary CTA button background
 * buttonHover — primary CTA button hover background
 */

export type KitPalette = {
  pageBg: string;
  bgSoft: string;
  bgMedium: string;
  accent: string;
  heading: string;
  body: string;
  button: string;
  buttonHover: string;
};

export const KIT_PALETTES: Record<string, KitPalette> = {
  green: {
    pageBg: "#f0fdf4",
    bgSoft: "#e6f3ea",
    bgMedium: "#cfeeda",
    accent: "#168647",
    heading: "#0c7a3b",
    body: "#138042",
    button: "#09b23f",
    buttonHover: "#089a38",
  },
  blue: {
    pageBg: "#eff6ff",
    bgSoft: "#dbeafe",
    bgMedium: "#bfdbfe",
    accent: "#2563eb",
    heading: "#1e3a8a",
    body: "#1d4ed8",
    button: "#3b82f6",
    buttonHover: "#2563eb",
  },
  purple: {
    pageBg: "#f5f3ff",
    bgSoft: "#ede9fe",
    bgMedium: "#ddd6fe",
    accent: "#7c3aed",
    heading: "#4c1d95",
    body: "#6d28d9",
    button: "#8b5cf6",
    buttonHover: "#7c3aed",
  },
  rose: {
    pageBg: "#fff1f2",
    bgSoft: "#ffe4e6",
    bgMedium: "#fecdd3",
    accent: "#e11d48",
    heading: "#881337",
    body: "#be123c",
    button: "#f43f5e",
    buttonHover: "#e11d48",
  },
  orange: {
    pageBg: "#fff7ed",
    bgSoft: "#ffedd5",
    bgMedium: "#fed7aa",
    accent: "#ea580c",
    heading: "#7c2d12",
    body: "#c2410c",
    button: "#f97316",
    buttonHover: "#ea580c",
  },
  teal: {
    pageBg: "#f0fdfa",
    bgSoft: "#ccfbf1",
    bgMedium: "#99f6e4",
    accent: "#0d9488",
    heading: "#134e4a",
    body: "#0f766e",
    button: "#14b8a6",
    buttonHover: "#0d9488",
  },
  amber: {
    pageBg: "#fffbeb",
    bgSoft: "#fef3c7",
    bgMedium: "#fde68a",
    accent: "#d97706",
    heading: "#78350f",
    body: "#b45309",
    button: "#f59e0b",
    buttonHover: "#d97706",
  },
  indigo: {
    pageBg: "#eef2ff",
    bgSoft: "#e0e7ff",
    bgMedium: "#c7d2fe",
    accent: "#4f46e5",
    heading: "#312e81",
    body: "#4338ca",
    button: "#6366f1",
    buttonHover: "#4f46e5",
  },
};

export function getKitPalette(colorTheme?: string | null): KitPalette {
  return KIT_PALETTES[colorTheme ?? "green"] ?? KIT_PALETTES.green;
}
