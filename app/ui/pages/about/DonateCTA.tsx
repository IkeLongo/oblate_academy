import Link from "next/link";
import Image from "next/image";

export default function DonateCTA() {
  return (
    <section className="base relative bg-blue-100 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Decorative background underline */}
        <div className="absolute left-1/2 bottom-10 w-full -translate-x-1/2 pointer-events-none select-none">
          <Image
            src="/title-underline-gray.svg"
            alt=""
            width={1000}
            height={200}
            className="w-[300px] h-[28px] sm:w-[420px] sm:h-[38px] md:w-[560px] md:h-[48px] mx-auto opacity-50"
          />
        </div>

        <div className="relative flex flex-col items-center text-center gap-6">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            Support the Mission
          </p>
          <h2 className="font-fredoka font-extrabold text-3xl sm:text-4xl md:text-5xl text-blue-400 leading-tight max-w-2xl">
            Help us reach more families
          </h2>
          <p className="max-w-2xl font-inria text-base sm:text-lg leading-relaxed text-black/70">
            Every donation goes directly toward creating new resources, supporting families who
            cannot afford them, and growing the Oblate Academy community. Join us in forming the
            next generation of Catholic disciples.
          </p>

          {/* TODO: Replace href with the actual donation page URL */}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-10 py-[0.9rem] text-sm font-extrabold uppercase tracking-wide text-yellow-900 transition-colors hover:bg-yellow-300"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Donate to Oblate Academy
          </Link>
        </div>
      </div>
    </section>
  );
}
