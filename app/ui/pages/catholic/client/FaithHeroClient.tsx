"use client";

import { motion } from "framer-motion";
import { GiggleIcon } from "@/app/ui/animations/GiggleIcon";

type FaithHeroClientProps = {
  heading: string;
  subheading: string;
};

export function FaithHeroClient({ heading, subheading }: FaithHeroClientProps) {
  return (
    <div className="relative w-full">
      {/* Decorative corner icons */}
      <GiggleIcon
        src="/chalice.svg"
        alt=""
        width={50}
        height={80}
        styleClass="absolute left-0 -top-8 pointer-events-none select-none"
        className="opacity-40 w-[44px] h-[44px] md:w-[40px] md:h-[70px] rotate-12"
        delay={0.5}
      />
      <GiggleIcon
        src="/cross-plus.svg"
        alt=""
        width={80}
        height={80}
        styleClass="absolute right-0 -top-8 pointer-events-none select-none"
        className="opacity-40 w-[44px] h-[44px] md:w-[70px] md:h-[70px]"
        delay={0.7}
      />

      {/* Heading */}
      <motion.h1
        className="relative z-10 font-fredoka font-extrabold text-white text-4xl sm:text-5xl md:text-6xl leading-tight text-center"
        style={{ textShadow: "0 4px 6px rgba(0,0,0,0.18)" }}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        {heading}
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="relative z-10 mt-6 max-w-2xl mx-auto text-center text-blue-100 text-lg sm:text-xl leading-relaxed font-semibold"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.18, ease: "easeOut" }}
      >
        {subheading}
      </motion.p>
    </div>
  );
}
