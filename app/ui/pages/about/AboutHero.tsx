import Link from "next/link";
import { AboutHeroClient } from "./client/AboutHeroClient";

export default function AboutHero() {
  return (
    <section
      className="hero relative w-full overflow-hidden min-h-[100vh] flex items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hero/about-section-hero.png')" }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 pt-36 navdesk:py-32 navdesk:pt-32 flex flex-col items-center text-center w-full">
        <AboutHeroClient
          heading="Meet the Oblate Academy"
          subheading="Nurturing young hearts through faith, virtue, and joy — Catholic resources for families and educators, grades K–5."
        />

        <div className="mt-10 z-20 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-blue-400 transition-colors hover:bg-blue-100"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Explore Resources
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
