import Image from "next/image";

export default function WhatWeBelieve() {
  return (
    <div className="base relative !overflow-visible">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div>
            <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
              What We Believe
            </p>
            <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
              Rooted in Christ, formed in joy
            </h2>
            <p className="mt-6 font-inria text-base leading-relaxed text-black/70">
              The Oblate Academy is a Catholic faith formation platform built on the conviction that
              children are made for God — and that every lesson, every activity, and every resource
              should help them know, love, and serve Him.
            </p>
            <p className="mt-4 font-inria text-base leading-relaxed text-black/70">
              Our content is fully aligned with the Catechism of the Catholic Church. We draw on the
              treasury of the saints, the richness of Sacred Scripture, and the timeless wisdom of
              the Church to create resources that are both beautiful and orthodox.
            </p>
            <div className="mt-8 border-l-4 border-blue-300 pl-5">
              <p className="font-inria text-base italic text-black/60">
                &ldquo;Train up a child in the way he should go; even when he is old he will not
                depart from it.&rdquo;
              </p>
              <p className="mt-2 font-poppins font-semibold text-sm text-blue-400">
                — Proverbs 22:6
              </p>
            </div>
          </div>

          {/* Image column */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
              <Image
                src="/young-boy-with-dove.webp"
                alt="A child learning about the Catholic faith"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 400px"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
