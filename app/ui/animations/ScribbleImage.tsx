"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type ScribbleImageProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function ScribbleOnImage({
  src,
  alt = "",
  width,
  height,
  className = "",
  priority,
}: ScribbleImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const DELAY = 0.35;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: DELAY * 0.6 }}
      >
        <motion.div
          className="relative overflow-hidden"
          initial={{ clipPath: "inset(0 100% 0 0 round 12px)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0 round 12px)" } : {}}
          transition={{ duration: 0.9, delay: DELAY, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ x: -10, rotate: -1.2, y: 2, scale: 0.98 }}
            animate={inView ? { x: 0, rotate: 0, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: DELAY, ease: "easeOut" }}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
            />
          </motion.div>

          {/* Shimmer pass */}
          <motion.div
            className="pointer-events-none absolute inset-y-0 -left-24 w-24 bg-white/20"
            style={{ mixBlendMode: "overlay" }}
            initial={{ opacity: 0, x: 0 }}
            animate={inView ? { x: width + 200, opacity: [0, 1, 0] } : {}}
            transition={{
              duration: 0.7,
              delay: DELAY + 0.15,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}