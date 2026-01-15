import FaithAndFun from "@/app/ui/pages/home/FaithAndFun";
import GradeContent from "@/app/ui/pages/home/GradeContent";
import OblateAcademyHero from "@/app/ui/pages/home/Hero";
import ParentTeacherResources from "@/app/ui/shared/ParentTeacherResources";
import TeachPillars from "@/app/ui/pages/home/TeachPillars";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <OblateAcademyHero />
      <GradeContent />
      <FaithAndFun />
      <ParentTeacherResources />
      <TeachPillars />
    </div>
  );
}
