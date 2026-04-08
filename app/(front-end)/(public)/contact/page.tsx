import type { Metadata } from "next";
import { ContactSectionWithShader } from "@/app/ui/pages/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us — Oblate Academy",
  description:
    "Get in touch with the Oblate Academy team. We'd love to hear from you.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us — Oblate Academy",
    description:
      "Get in touch with the Oblate Academy team. We'd love to hear from you.",
  },
};

export default function ContactPage() {
  return (
    <main className="base">
      <ContactSectionWithShader />
    </main>
  );
}
