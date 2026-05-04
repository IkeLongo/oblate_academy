import type { Metadata } from "next";
import AboutHero from "@/app/ui/pages/about/AboutHero";
import MissionVision from "@/app/ui/pages/about/MissionVision";
import OurStory from "@/app/ui/pages/about/OurStory";
import CoreValues from "@/app/ui/pages/about/CoreValues";
import Programs from "@/app/ui/pages/about/Programs";
import WhyItMatters from "@/app/ui/pages/about/WhyItMatters";
import Leadership from "@/app/ui/pages/about/Leadership";
import ImpactNumbers from "@/app/ui/pages/about/ImpactNumbers";
import DonateCTA from "@/app/ui/pages/about/DonateCTA";
import { AboutTeam } from "@/app/ui/pages/about/AboutTeam";

export const metadata: Metadata = {
  title: "About Oblate Academy — Our Mission & Story",
  description:
    "Learn about Oblate Academy's mission to nurture young hearts through faith, virtue, and joy. Catholic resources for families and educators, grades K–5.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Oblate Academy — Our Mission & Story",
    description:
      "Learn about Oblate Academy's mission to nurture young hearts through faith, virtue, and joy. Catholic resources for families and educators, grades K–5.",
  },
};

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <AboutHero />
      <MissionVision />
      <AboutTeam />
      <CoreValues />
      {/* <OurStory /> */}
      <Programs />
      <WhyItMatters />
      {/* <Leadership /> */}
      <ImpactNumbers />
      <DonateCTA />
    </div>
  );
}
