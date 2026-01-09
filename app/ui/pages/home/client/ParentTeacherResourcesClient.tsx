"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ScribbleOnImage } from "@/app/ui/animations/ScribbleImage";
import { GiggleIcon } from "@/app/ui/animations/GiggleIcon";

export default function ParentTeacherResourcesClient() {
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

  const underlineWidth = useMemo(() => (isWrapped ? 420 : 1000), [isWrapped]);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none">
      {/* Top-left cross (giggle) */}
      {inView && (
        <GiggleIcon
          src="/cross-plus.svg"
          width={90}
          height={90}
          styleClass="absolute left-2 bottom-20 sm:left-10 sm:bottom-20 md:bottom-auto md:top-20 w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] pointer-events-none"
          className="opacity-40"
          delay={0.0}
        />
      )}

      {/* Top-right rosary (giggle) */}
      {inView && (
        <GiggleIcon
          src="/full-rosary.svg"
          width={110}
          height={110}
          styleClass="absolute right-6 sm:right-10 bottom-20 sm:bottom-20 md:bottom-auto md:top-20 w-[90px] h-[90px] sm:w-[110px] sm:h-[110px]"
          className="opacity-40"
          delay={0.15}
        />
      )}

      {/* Title + scribble underline */}
      <div className="absolute left-1/2 top-[90px] sm:top-[100px] md:top-[110px] -translate-x-1/2 w-full flex flex-col items-center">
        <h3
          ref={titleRef}
          className="relative z-10 text-blue-400 font-extrabold tracking-wide text-xl sm:text-2xl md:text-3xl uppercase text-center"
          id="parent-teacher-title"
        >
          Parent and<wbr />
          <span style={{ whiteSpace: "nowrap" }}> Teacher Resources</span>
        </h3>
        <ScribbleOnImage
          src="/title-underline-baby-blue.svg"
          alt=""
          width={underlineWidth}
          height={70}
          className={`w-full opacity-70 ${
                isWrapped
                  ? "max-w-[1000px] px-[2rem] -top-6 xs:px-[4rem] xs:-top-6 sm:px-[8rem] sm:-top-4 md:px-[11rem] md:-top-4"
                  : "-top-6 2xs:-top-6 2xs:px-[3rem] xs:px-[5rem] sm:px-[7rem] md:-top-10 md:px-[10rem] lg:-top-8 lg:px-64"
              }`}
        />
      </div>
    </div>
  );
}
