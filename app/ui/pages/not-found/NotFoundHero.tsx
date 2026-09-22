import Image from "next/image";
import Link from "next/link";

export default function NotFoundHero() {
  return (
    <section className="hero relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-blue-400 to-blue-500 px-6 py-24 text-center">
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        <Image
          src="/oblate-logo-white.webp"
          alt="Oblate Academy"
          width={400}
          height={79}
          priority
        />

        <p className="mt-10 font-fredoka text-[6rem] leading-none font-bold text-white/20 sm:text-[8rem] navdesk:text-[10rem]">
          404
        </p>

        <h1 className="mt-4 font-fredoka text-2xl font-bold text-white sm:text-3xl navdesk:text-4xl">
          Page Not Found
        </h1>

        <p className="mt-4 max-w-md font-inria text-base text-blue-100">
          We couldn&apos;t find the page you&apos;re looking for. It may have moved or no longer exists.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-yellow-400 px-8 py-3 font-poppins text-sm font-semibold text-yellow-900 shadow transition-colors hover:bg-yellow-300"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
