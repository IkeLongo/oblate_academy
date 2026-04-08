import type { Metadata } from "next";
import FaithAndFun from "@/app/ui/pages/home/FaithAndFun";
import GradeContent from "@/app/ui/pages/home/GradeContent";
import OblateAcademyHero from "@/app/ui/pages/home/Hero";
import ParentTeacherResources from "@/app/ui/shared/resources/ParentTeacherResources";
import TeachPillars from "@/app/ui/pages/home/TeachPillars";

export const metadata: Metadata = {
  title: {
    absolute: "Oblate Academy — Catholic Resources for Kids",
  },
  description:
    "Faith-filled Catholic resources for families and educators — saints, virtues, and learning kits for grades K–5.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oblate Academy — Catholic Resources for Kids",
    description:
      "Faith-filled Catholic resources for families and educators — saints, virtues, and learning kits for grades K–5.",
  },
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      <OblateAcademyHero />
      <GradeContent />
      <FaithAndFun />
      <ParentTeacherResources />
      <TeachPillars />
    </div>
  );
}
