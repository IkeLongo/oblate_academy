import FaithAndFun from "../ui/pages/home/FaithAndFun";
import GradeContent from "../ui/pages/home/GradeContent";
import OblateAcademyHero from "../ui/pages/home/Hero";
import ParentTeacherResources from "../ui/pages/home/ParentTeacherResources";
import TeachPillars from "../ui/pages/home/TeachPillars";

export default function Home() {
  return (
    <div className="">
      <OblateAcademyHero />
      <GradeContent grade="k2" />
      <FaithAndFun />
      <ParentTeacherResources />
      <TeachPillars />
    </div>
  );
}
