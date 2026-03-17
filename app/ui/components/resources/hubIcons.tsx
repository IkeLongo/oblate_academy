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
import AssessmentIcon from "./AssessmentIcon";
import PrayIcon from "./PrayIcon";
import TargetIcon from "./TargetIcon";
import FamilyIcon from "./FamilyIcon";

export function HubIcon({ iconKey, className, color }: { iconKey: string; className?: string; color?: string }) {
  // Handle custom SVG icons separately
  if (iconKey === "assessment") {
    return <AssessmentIcon className={className} color={color} />;
  }
  if (iconKey === "pray") {
    return <PrayIcon className={className} color={color} />;
  }
  if (iconKey === "target") {
    return <TargetIcon className={className} color={color} />;
  }
  if (iconKey === "family") {
    return <FamilyIcon className={className} color={color} />;
  }

  const Icon =
    iconKey === "lesson"
      ? BookOpen
      : iconKey === "parents"
      ? Users
      : iconKey === "print"
      ? Printer
      : iconKey === "video"
      ? Video
      : iconKey === "tips"
      ? Lightbulb
      : iconKey === "book"
      ? BookOpen
      : iconKey === "users"
      ? Users
      : iconKey === "file"
      ? FileText
      : iconKey === "check"
      ? ClipboardCheck
      : iconKey === "bulb"
      ? Lightbulb
      : iconKey === "sparkles"
      ? Sparkles
      : iconKey === "palette"
      ? Palette
      : iconKey === "notebook"
      ? NotebookPen
      : iconKey === "puzzle"
      ? Puzzle
      : iconKey === "handheart"
      ? HandHeart
      : iconKey === "filecog"
      ? FileCog
      : iconKey === "house"
      ? House
      : iconKey === "discussion"
      ? MessagesSquare
      : iconKey === "crosshair"
      ? Crosshair
      : iconKey === "magnet"
      ? Magnet
      : iconKey === "star"
      ? Star
      : iconKey === "signal"
      ? Signal
      : iconKey === "tableofcontents"
      ? TableOfContents
      : iconKey === "trendingup"
      ? TrendingUp
      : iconKey === "listchecks"
      ? ListChecks
      : iconKey === "briefcasebusiness"
      ? BriefcaseBusiness
      : iconKey === "school"
      ? School
      : iconKey === "question"
      ? MessageCircleQuestionMark
      : iconKey === "smile"
      ? Smile
      : Smile; // Default icon

  return <Icon className={className} aria-hidden="true" />;
}
