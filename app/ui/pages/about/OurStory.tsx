import Image from "next/image";

export default function OurStory() {
  return (
    <div className="base relative !overflow-visible">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div>
            <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
              Our Story
            </p>
            <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
              How the Oblate Academy began
            </h2>
            <p className="mt-6 font-inria text-base leading-relaxed text-black/70">
              The Oblate Academy was founded by Marisela Guillen out of a deep love for the Catholic faith and a desire to give families practical tools for forming their children&apos;s hearts. As a mother and educator, Marisela saw firsthand how much parents and teachers longed for resources that were both beautiful and rooted in authentic Catholic tradition.
            </p>
            <p className="mt-4 font-inria text-base leading-relaxed text-black/70">
              What began as a personal project — creating lesson plans and activity kits for her own children — grew into a full curriculum resource platform serving families, homeschool co-ops, and Catholic schools across the country. Every resource at the Oblate Academy is crafted with love, grounded in the lives of the saints, and designed to make learning the faith a joy for children in grades K–5.
            </p>
            <div className="mt-8 border-l-4 border-blue-300 pl-5">
              <p className="font-inria text-base italic text-black/60">
                &ldquo;We build resources that feel like home — warm, faithful, and full of wonder.&rdquo;
              </p>
              <p className="mt-2 font-poppins font-semibold text-sm text-blue-400">
                — Marisela Guillen, Founder
              </p>
            </div>
          </div>

          {/* Image column */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-md">
              {/* TODO: Replace src with the actual founder / campus photo */}
              <Image
                src="/desciple-of-christ.webp"
                alt="Marisela Guillen, Founder of Oblate Academy"
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
