"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GiggleIconProps } from "@/app/types/types";

export function GiggleIcon({
  src,
  alt = "",
  width,
  height,
  className = "",
  styleClass = "",
  delay = 0,
}: GiggleIconProps) {
  return (
    <motion.div
      className={styleClass}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        rotate: [0, 2, -2, 1, -1, 0],
        y: [0, -2, 1, -1, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay },
        rotate: {
          delay: delay + 0.4,
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 3,
        },
        y: {
          delay: delay + 0.4,
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 3,
        },
      }}
    >
      <Image src={src} alt={alt} width={width} height={height} className={className} />
    </motion.div>
  );
}
