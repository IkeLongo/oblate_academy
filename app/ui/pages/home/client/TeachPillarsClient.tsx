"use client";

import { useInView } from "framer-motion";
import { ScribbleOnImage } from "@/app/ui/animations/ScribbleImage";
import { useEffect, useMemo, useRef, useState } from "react";

type TeachPillarsClientProps = {
  underlineSrc?: string;
  underlineWidth?: number;
  underlineHeight?: number;
  className?: string;
};

export function TeachPillarsClient({
  underlineSrc = "/title-underline-royal-blue.svg",
  underlineWidth = 900,
  underlineHeight = 90,
  className = "",
}: TeachPillarsClientProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    let raf = 0;

    const computeWrapped = () => {
      const styles = window.getComputedStyle(el);
      const fontSize = parseFloat(styles.fontSize || "0");
      let lineHeight = parseFloat(styles.lineHeight || "0");
      if (!lineHeight || Number.isNaN(lineHeight)) lineHeight = fontSize * 1.2;

      const height = el.getBoundingClientRect().height;
      const lines = Math.round(height / lineHeight);
      const next = lines > 1;

      setIsWrapped((prev) => (prev === next ? prev : next));
    };

    const checkWrap = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeWrapped);
    };

    checkWrap();

    const ro = new ResizeObserver(checkWrap);
    ro.observe(el);

    window.addEventListener("resize", checkWrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", checkWrap);
    };
  }, []);

  const scribbleWidth = useMemo(() => (isWrapped ? underlineWidth : underlineWidth * 1.1), [isWrapped, underlineWidth]);

  return (
    <div ref={ref} className={["relative text-center", className].join(" ")}>
      <h3
        ref={titleRef}
        className="relative z-10 text-blue-400 font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight"
      >
        What we teach at the<wbr />
        <span style={{ whiteSpace: "nowrap" }}> Oblate Academy</span>
      </h3>

      {/* underline behind */}
      <div className="relative mt-2 flex justify-center">
        <div className="w-full max-w-4xl opacity-90 pointer-events-none">
          {inView ? (
            <ScribbleOnImage
              src={underlineSrc}
              alt=""
              width={scribbleWidth}
              height={underlineHeight}
              className={`w-full ${
                isWrapped
                  ? "max-w-[1000px] px-none -top-4 2xs:px-[4rem] 2xs:-top-4 sm:px-[8rem] sm:-top-4 md:px-[8rem] md:-top-6"
                  : "-top-6 sm:px-0 md:-top-8 md:px-none"
              }`}
            />
          ) : (
            // Reserve space so layout doesn't jump before in-view
            <div style={{ height: underlineHeight }} />
          )}
        </div>
      </div>
    </div>
  );
}
