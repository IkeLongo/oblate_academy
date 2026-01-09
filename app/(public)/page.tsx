import FaithAndFun from "../ui/pages/home/FaithAndFun";
import GradeContent from "../ui/pages/home/GradeContent";
import OblateAcademyHero from "../ui/pages/home/Hero";

export default function Home() {
  return (
    <div className="">
      <OblateAcademyHero />
      <GradeContent grade="k2" />
      <FaithAndFun />
    </div>
  );
}
