import { set, StringInputProps } from "sanity";
import { KIT_PALETTES } from "@/app/lib/kitPalette";

const THEME_LABELS: Record<string, string> = {
  green: "Green",
  blue: "Blue",
  purple: "Purple",
  rose: "Rose",
  orange: "Orange",
  teal: "Teal",
  amber: "Amber",
  indigo: "Indigo",
};

export function ColorThemeInput({ value, onChange }: StringInputProps) {
  const current = (value as string | undefined) ?? "green";

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "4px 0" }}>
      {Object.entries(KIT_PALETTES).map(([key, palette]) => {
        const selected = current === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(set(key))}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              padding: "10px 14px",
              border: `2px solid ${selected ? palette.button : "#e2e8f0"}`,
              borderRadius: "10px",
              background: selected ? palette.pageBg : "#f8fafc",
              cursor: "pointer",
              outline: "none",
              transition: "border-color 150ms, background 150ms",
            }}
            title={THEME_LABELS[key]}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${palette.bgMedium} 0%, ${palette.button} 100%)`,
                display: "block",
                boxShadow: selected
                  ? `0 0 0 2px white, 0 0 0 4px ${palette.button}`
                  : "0 1px 3px rgba(0,0,0,0.12)",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: selected ? 700 : 500,
                color: selected ? palette.heading : "#64748b",
              }}
            >
              {THEME_LABELS[key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
