import Link from "next/link";
import { FaithHeroClient } from "./client/FaithHeroClient";

export default function FaithHero() {
  return (
    <section className="hero relative w-full bg-gradient-to-b from-blue-400 to-blue-500 overflow-hidden min-h-[55vh] flex items-center">
      <div className="relative mx-auto max-w-6xl px-6 py-24 pt-36 md:py-32 md:pt-32 flex flex-col items-center text-center w-full">
        <FaithHeroClient
          heading="The Heart of Everything We Do"
          subheading="At Oblate Academy, every resource flows from the Catholic faith — rooted in Christ, shaped by the saints, and formed through virtue."
        />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-blue-400 transition-colors hover:bg-blue-100"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Explore Resources
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-8 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
