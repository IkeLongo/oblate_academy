import Image from "next/image";
import { PillarCard } from "../../components/PillarCard";
import { TeachPillarsClient } from "./client/TeachPillarsClient";

export default function TeachPillars() {
  return (
    <section className="base relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 via-gray-100 to-yellow-200" />

      {/* TOP CLOUD BORDER */}
      <div className="absolute -top-4 md:-top-10 left-1/2 -translate-x-1/2 min-w-[110vw] pointer-events-none select-none">
        <Image
          src="/cloud-border-yellow.webp"
          alt="Cloud shaped border top"
          width={2400}
          height={300}
          priority
        />
      </div>

      {/* BOTTOM CLOUD BORDER */}
      <div className="absolute -bottom-4 md:-bottom-10 left-1/2 -translate-x-1/2 min-w-[110vw] pointer-events-none select-none">
        <Image
          src="/cloud-border-yellow.webp"
          alt="Cloud shaped border bottom"
          width={2400}
          height={300}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 pb-16 sm:py-10 sm:pb-20 md:py-12 md:pb-20">
        {/* Decorative dots (top-left) */}
        <div className="absolute left-2 top-10 2xs:left-10 sm:top-12 md:top-0 lg:top-40 opacity-90 pointer-events-none select-none">
          <Image
            src="/dots-2.svg"
            alt="Decorative polka dots"
            width={90}
            height={60}
            className="w-[70px] h-[44px] sm:w-[90px] sm:h-[60px] md:w-[80px] md:h-[54px] lg:w-[90px] lg:h-[60px]"
          />
        </div>

        {/* Decorative cloud (top-right) */}
        <div className="absolute right-6 top-10 sm:right-10 sm:top-12 md:top-6 lg:top-40 opacity-70 pointer-events-none select-none">
          <Image
            src="/cloud.svg"
            alt="Decorative cloud"
            width={70}
            height={70}
            className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px]"
          />
        </div>

        {/* Title */}
        <TeachPillarsClient />

        {/* Subtitle */}
        <p className="mx-auto mt-2 xs:mt-0 max-w-3xl text-center text-base sm:text-xl text-[#0E3A4C]/80 font-semibold leading-relaxed">
          Discover the three pillars of Catholic education that guide children on their faith journey.
          Learning from holy Saints, practicing timeless Virtues, and engaging in meaningful Activities.
        </p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <PillarCard
            imageSrc="/desciple-of-christ.webp"
            imageAlt="Disciple of Christ"
            title="SAINTS"
            description="We learn about saints to see examples of how to live good, faithful lives. They can inspire us to be kind, brave, generous, and loving just like they were!"
            borderClassName="border-green-400"
          />

          <PillarCard
            imageSrc="/young-boy-with-dove.webp"
            imageAlt="Young boy with dove"
            title="VIRTUES"
            description="When we practice virtues, we become more like Jesus and make the world a better place."
            borderClassName="border-blue-400"
            className="md:translate-y-6"
          />

          <PillarCard
            imageSrc="/apple-tree.webp"
            imageAlt="Apple tree"
            title="ACTIVITIES"
            description="Whether it's solving puzzles, completing worksheets, or making crafts, each activity helps make learning about God enjoyable and memorable!"
            borderClassName="border-red-400"
          />
        </div>
      </div>
    </section>
  );
}
