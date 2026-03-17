import React from "react";
import { PreviewProps } from "sanity";
import { Box, Card, Flex, Stack, Text } from "@sanity/ui";

// Map iconKey to SVG filename
const ICON_MAP: Record<string, string> = {
  lesson: "/lesson-icon.svg",
  parents: "/parent-icon.svg",
  print: "/printable-icon.svg",
  video: "/training-videos-icon.svg",
  assessment: "/assessment-icon.svg",
  tips: "/tips-icon.svg",
};

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
  
  const iconSrc = iconKey ? ICON_MAP[iconKey] : null;
  const themeColor = themeKey ? THEME_COLORS[themeKey] : "#666";

  return (
    <Card padding={3} radius={2} shadow={1}>
      <Flex align="center" gap={3}>
        {iconSrc && (
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
            }}
          >
            <img 
              src={iconSrc} 
              alt={iconKey}
              style={{ width: "100%", height: "100%", filter: "brightness(0) invert(1)" }}
            />
          </Box>
        )}
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
