import React from "react";
import { PreviewProps } from "sanity";
import { Box, Card, Flex, Stack, Text } from "@sanity/ui";
import {
  BookOpen,
  Users,
  FileText,
  Video,
  ClipboardCheck,
  Lightbulb,
  Sparkles,
  HandHeart,
  GraduationCap,
  Printer,
  Palette,
  NotebookPen,
  Puzzle,
  FileCog,
  House,
  MessagesSquare,
  Crosshair,
  Magnet,
  Star,
  Signal,
  TableOfContents,
  TrendingUp,
  ListChecks,
  BriefcaseBusiness,
  School,
  MessageCircleQuestionMark,
  Smile,
  Pencil,
} from "lucide-react";

// Map iconKey to SVG filename for custom icons
const CUSTOM_ICON_MAP: Record<string, string> = {
  assessment: "/assessment-icon.svg",
  pray: "/pray-icon.svg",
  target: "/target-icon.svg",
  family: "/family-icon.svg",
};

// Get Lucide icon component by key
function getLucideIcon(iconKey: string) {
  const iconMap: Record<string, any> = {
    lesson: BookOpen,
    parents: Users,
    print: Printer,
    video: Video,
    tips: Lightbulb,
    book: BookOpen,
    users: Users,
    file: FileText,
    check: ClipboardCheck,
    bulb: Lightbulb,
    sparkles: Sparkles,
    palette: Palette,
    notebook: NotebookPen,
    puzzle: Puzzle,
    handheart: HandHeart,
    filecog: FileCog,
    house: House,
    discussion: MessagesSquare,
    crosshair: Crosshair,
    magnet: Magnet,
    star: Star,
    signal: Signal,
    tableofcontents: TableOfContents,
    trendingup: TrendingUp,
    listchecks: ListChecks,
    briefcasebusiness: BriefcaseBusiness,
    school: School,
    question: MessageCircleQuestionMark,
    smile: Smile,
    graduation: GraduationCap,
    pencil: Pencil,
  };
  return iconMap[iconKey] || Smile;
}

// Map themeKey to colors for preview
const THEME_COLORS: Record<string, string> = {
  blue: "#3b82f6",
  green: "#10b981",
  purple: "#8b5cf6",
  red: "#ef4444",
  yellow: "#eab308",
  indigo: "#6366f1",
};

export function ResourceHubCardPreview(props: PreviewProps) {
  const { title, iconKey, themeKey } = props as any;
  const customIconSrc = iconKey ? CUSTOM_ICON_MAP[iconKey] : null;
  const themeColor = themeKey ? THEME_COLORS[themeKey] : "#666";

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Flex align="center" gap={3}>
        <Box
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: themeColor,
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "white",
          }}
        >
          {customIconSrc ? (
            <img
              src={customIconSrc}
              alt={iconKey}
              style={{ width: "100%", height: "100%", filter: "brightness(0) invert(1)" }}
            />
          ) : (
            React.createElement(getLucideIcon(iconKey), { size: 24 })
          )}
        </Box>
        <Stack space={2}>
          <Text size={2} weight="semibold">
            {title || "Untitled Card"}
          </Text>
          <Text size={1} muted>
            Theme: {themeKey || "none"} • Icon: {iconKey || "none"}
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}
