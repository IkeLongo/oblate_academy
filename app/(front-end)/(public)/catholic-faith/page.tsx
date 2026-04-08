import type { Metadata } from "next";
import FaithHero from "@/app/ui/pages/catholic/FaithHero";
import WhatWeBelieve from "@/app/ui/pages/catholic/WhatWeBelieve";
import FaithPillars from "@/app/ui/pages/catholic/FaithPillars";
import SaintsShowcase from "@/app/ui/pages/catholic/SaintsShowcase";
import VirtuesShowcase from "@/app/ui/pages/catholic/VirtuesShowcase";
import FamilyFormation from "@/app/ui/pages/catholic/FamilyFormation";
import FaithInAction from "@/app/ui/pages/catholic/FaithInAction";
import FAQSection from "@/app/ui/pages/catholic/FAQSection";
import ResourcesCTA from "@/app/ui/pages/catholic/ResourcesCTA";

export const metadata: Metadata = {
  title: "Catholic Faith Formation — The Heart of Oblate Academy",
  description:
    "Discover how Oblate Academy grounds every resource in Catholic faith, virtue, and the lives of the saints — faith formation for children and families K–5.",
  alternates: {
    canonical: "/catholic-faith",
  },
  openGraph: {
    title: "Catholic Faith Formation — The Heart of Oblate Academy",
    description:
      "Discover how Oblate Academy grounds every resource in Catholic faith, virtue, and the lives of the saints — faith formation for children and families K–5.",
  },
};

export default function CatholicFaithPage() {
  return (
    <div className="overflow-hidden">
      <FaithHero />
      <WhatWeBelieve />
      <FaithPillars />
      <SaintsShowcase />
      <VirtuesShowcase />
      <FamilyFormation />
      <FaithInAction />
      <FAQSection />
      <ResourcesCTA />
    </div>
  );
}
