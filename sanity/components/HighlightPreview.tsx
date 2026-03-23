import React from "react";
import { PreviewProps } from "sanity";
import { Box, Card, Flex, Text } from "@sanity/ui";
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
  Download,
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
    download: Download,
  };
  return iconMap[iconKey] || Smile;
}

export function HighlightPreview(props: PreviewProps) {
  const { title, iconKey } = props as any;
  const customIconSrc = iconKey ? CUSTOM_ICON_MAP[iconKey] : null;

  return (
    <Card padding={2} radius={2}>
      <Flex align="center" gap={3}>
        <Box
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            backgroundColor: "#10b981",
            padding: "6px",
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
            React.createElement(getLucideIcon(iconKey), { size: 20 })
          )}
        </Box>
        <Text size={2} weight="medium">
          {title || "Highlight"}
        </Text>
      </Flex>
    </Card>
  );
}
