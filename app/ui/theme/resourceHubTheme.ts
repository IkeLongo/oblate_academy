export type HubThemeKey = "blue" | "green" | "purple" | "red" | "yellow" | "indigo";

export type HubTheme = {
  // card
  iconBg: string;
  iconFg: string;  iconColor: string; // hex color for SVG icons
  // row pill
  pillBg: string;
  pillFg: string;

  // subtle border / shadow highlight
  border: string;

  titleFg: string;

  // button styling (we’ll pass to MUI sx)
  buttonBg: string;
  buttonFg: string;
};

export const hubThemeMap: Record<HubThemeKey, HubTheme> = {
  blue: {
    iconBg: "bg-blue-100",
    iconFg: "text-blue-700",
    iconColor: "#1d4ed8",
    pillBg: "bg-blue-50",
    pillFg: "text-blue-700",
    border: "border-blue-100",

    // ✅ title color
    titleFg: "text-blue-700",

    buttonBg: "#2563eb",
    buttonFg: "#ffffff",
  },
  green: {
    iconBg: "bg-green-100",
    iconFg: "text-green-700",
    iconColor: "#15803d",
    pillBg: "bg-green-50",
    pillFg: "text-green-700",
    border: "border-green-100",
    titleFg: "text-green-700",
    buttonBg: "#16a34a",
    buttonFg: "#ffffff",
  },
  purple: {
    iconBg: "bg-purple-100",
    iconFg: "text-purple-700",
    iconColor: "#7c3aed",
    pillBg: "bg-purple-50",
    pillFg: "text-purple-700",
    border: "border-purple-100",
    titleFg: "text-purple-700",
    buttonBg: "#7c3aed",
    buttonFg: "#ffffff",
  },
  red: {
    iconBg: "bg-red-100",
    iconFg: "text-red-700",
    iconColor: "#b91c1c",
    pillBg: "bg-red-50",
    pillFg: "text-red-700",
    border: "border-red-100",
    titleFg: "text-red-700",
    buttonBg: "#dc2626",
    buttonFg: "#ffffff",
  },
  yellow: {
    iconBg: "bg-yellow-100",
    iconFg: "text-yellow-800",
    iconColor: "#854d0e",
    pillBg: "bg-yellow-50",
    pillFg: "text-yellow-800",
    border: "border-yellow-100",
    titleFg: "text-yellow-800",
    buttonBg: "#ca8a04",
    buttonFg: "#ffffff",
  },
  indigo: {
    iconBg: "bg-indigo-100",
    iconFg: "text-indigo-700",
    iconColor: "#4338ca",
    pillBg: "bg-indigo-50",
    pillFg: "text-indigo-700",
    border: "border-indigo-100",
    titleFg: "text-indigo-700",
    buttonBg: "#4f46e5",
    buttonFg: "#ffffff",
  },
};
