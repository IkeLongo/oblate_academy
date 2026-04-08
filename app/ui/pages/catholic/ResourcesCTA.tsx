import Link from "next/link";

export default function ResourcesCTA() {
  return (
    <section className="base relative bg-blue-500 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-6">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-white/60">
            Ready to Start?
          </p>
          <h2 className="font-fredoka font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight max-w-2xl">
            Explore our Faith Formation Resources
          </h2>
          <p className="max-w-2xl font-inria text-base sm:text-lg leading-relaxed text-white/80">
            Browse saints, virtues, activity kits, and lesson plans — all grounded in authentic
            Catholic teaching and designed for children in grades K–5.
          </p>

          <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-[0.9rem] text-sm font-extrabold uppercase tracking-wide text-blue-500 transition-colors hover:bg-blue-100"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Browse All Resources
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-[0.9rem] text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
