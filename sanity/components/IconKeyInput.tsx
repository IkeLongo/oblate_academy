import React from "react";
import { StringInputProps, set, unset } from "sanity";
import { Box, Card, Flex, Stack, Text, Radio } from "@sanity/ui";
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
  };
  return iconMap[iconKey] || Smile;
}

const ICON_OPTIONS = [
  { title: "Lesson Plans", value: "lesson" },
  { title: "Book", value: "book" },
  { title: "Puzzle", value: "puzzle" },
  { title: "Pray", value: "pray" },
  { title: "Palette", value: "palette" },
  { title: "Notebook", value: "notebook" },
  { title: "Sparkles", value: "sparkles" },
  { title: "Parents/Users", value: "users" },
  { title: "Printable", value: "print" },
  { title: "Video", value: "video" },
  { title: "Assessment", value: "assessment" },
  { title: "Tips/Lightbulb", value: "tips" },
  { title: "File", value: "file" },
  { title: "Checkmark", value: "check" },
  { title: "Hand Heart", value: "handheart" },
  { title: "Graduation Cap", value: "graduation" },
  { title: "File Cog", value: "filecog" },
  { title: "House/Home", value: "house" },
  { title: "Discussion/Messages", value: "discussion" },
  { title: "Crosshair/Target", value: "crosshair" },
  { title: "Magnet", value: "magnet" },
  { title: "Star", value: "star" },
  { title: "Signal/Wifi", value: "signal" },
  { title: "Table of Contents", value: "tableofcontents" },
  { title: "Trending Up/Graph", value: "trendingup" },
  { title: "List Checks", value: "listchecks" },
  { title: "Briefcase Business", value: "briefcasebusiness" },
  { title: "School", value: "school" },
  { title: "Question/Help", value: "question" },
  { title: "Smile", value: "smile" },
  { title: "Target", value: "target" },
  { title: "Family", value: "family" },
];

export function IconKeyInput(props: StringInputProps) {
  const { onChange, value } = props;

  const handleChange = (newValue: string) => {
    onChange(newValue ? set(newValue) : unset());
  };

  return (
    <Stack space={2}>
      {ICON_OPTIONS.map((option) => {
        const customIconSrc = CUSTOM_ICON_MAP[option.value];
        const isSelected = value === option.value;

        return (
          <Card
            key={option.value}
            padding={2}
            radius={2}
            tone={isSelected ? "primary" : "default"}
            border
            style={{ cursor: "pointer" }}
            onClick={() => handleChange(option.value)}
          >
            <Flex align="center" gap={3}>
              <Radio
                checked={isSelected}
                readOnly
                style={{ pointerEvents: "none" }}
              />
              <Box
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  backgroundColor: isSelected ? "#6366f1" : "#e5e7eb",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: isSelected ? "white" : "#6b7280",
                }}
              >
                {customIconSrc ? (
                  <img
                    src={customIconSrc}
                    alt={option.value}
                    style={{
                      width: "100%",
                      height: "100%",
                      filter: isSelected ? "brightness(0) invert(1)" : "none",
                    }}
                  />
                ) : (
                  React.createElement(getLucideIcon(option.value), { size: 18 })
                )}
              </Box>
              <Text size={1} weight={isSelected ? "semibold" : "medium"}>
                {option.title}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Stack>
  );
}
