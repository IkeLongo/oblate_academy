"use client";

import { motion } from "framer-motion";
import { GiggleIcon } from "@/app/ui/animations/GiggleIcon";

type AboutHeroClientProps = {
  heading: string;
  subheading: string;
};

export function AboutHeroClient({ heading, subheading }: AboutHeroClientProps) {
  return (
    <div className="relative w-full">
      {/* Radial gradient overlay behind text */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[260px] w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.18) 70%, transparent 85%)",
        }}
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
