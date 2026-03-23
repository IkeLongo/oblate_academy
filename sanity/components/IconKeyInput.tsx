import React, { useState, useCallback, useRef, useEffect } from "react";
import { StringInputProps, set, unset } from "sanity";
import { Box, Card, Flex, Stack, Text } from "@sanity/ui";
import { ChevronDownIcon } from "@sanity/icons";
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

const ICON_OPTIONS = [
  { title: "Book", value: "book" },
  { title: "Briefcase Business", value: "briefcasebusiness" },
  { title: "Checkmark", value: "check" },
  { title: "Crosshair/Target", value: "crosshair" },
  { title: "Discussion/Messages", value: "discussion" },
  { title: "Download", value: "download" },
  { title: "Family", value: "family" },
  { title: "File", value: "file" },
  { title: "File Cog", value: "filecog" },
  { title: "Graduation Cap", value: "graduation" },
  { title: "Hand Heart", value: "handheart" },
  { title: "House/Home", value: "house" },
  { title: "Lesson Plans", value: "lesson" },
  { title: "List Checks", value: "listchecks" },
  { title: "Magnet", value: "magnet" },
  { title: "Notebook", value: "notebook" },
  { title: "Palette", value: "palette" },
  { title: "Parents/Users", value: "users" },
  { title: "Pencil", value: "pencil" },
  { title: "Pray", value: "pray" },
  { title: "Printable", value: "print" },
  { title: "Puzzle", value: "puzzle" },
  { title: "Question/Help", value: "question" },
  { title: "School", value: "school" },
  { title: "Star", value: "star" },
  { title: "Signal/Wifi", value: "signal" },
  { title: "Smile", value: "smile" },
  { title: "Sparkles", value: "sparkles" },
  { title: "Table of Contents", value: "tableofcontents" },
  { title: "Target", value: "target" },
  { title: "Tips/Lightbulb", value: "tips" },
  { title: "Trending Up/Graph", value: "trendingup" },
  { title: "Video", value: "video" },
];

export function IconKeyInput(props: StringInputProps) {
  const { onChange, value } = props;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback(
    (newValue: string) => {
      onChange(newValue ? set(newValue) : unset());
      setOpen(false);
    },
    [onChange]
  );

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selectedOption = ICON_OPTIONS.find((o) => o.value === value);
  const selectedCustomSrc = value ? CUSTOM_ICON_MAP[value] : null;

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Trigger */}
      <Card
        as="button"
        padding={2}
        radius={2}
        border
        tone={open ? "primary" : "default"}
        onClick={() => setOpen((prev) => !prev)}
        style={{ width: "100%", cursor: "pointer", appearance: "none", background: "transparent" }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            {value && (
              <Box
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "white",
                }}
              >
                {selectedCustomSrc ? (
                  <img
                    src={selectedCustomSrc}
                    alt={value}
                    style={{ width: "100%", height: "100%", filter: "brightness(0) invert(1)" }}
                  />
                ) : (
                  React.createElement(getLucideIcon(value), { size: 18 })
                )}
              </Box>
            )}
            <Text size={2}>{selectedOption?.title ?? "Select an icon…"}</Text>
          </Flex>
          <ChevronDownIcon style={{ flexShrink: 0 }} />
        </Flex>
      </Card>

      {/* Dropdown */}
      {open && (
        <Card
          shadow={2}
          radius={2}
          padding={2}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 9999,
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          <Stack space={1}>
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
                    <Box
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        backgroundColor: isSelected ? "transparent" : "#e5e7eb",
                        padding: "4px",
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
                        React.createElement(getLucideIcon(option.value), { size: 20 })
                      )}
                    </Box>
                    <Text size={2} weight={isSelected ? "semibold" : "regular"}>
                      {option.title}
                    </Text>
                  </Flex>
                </Card>
              );
            })}
          </Stack>
        </Card>
      )}
    </div>
  );
}
