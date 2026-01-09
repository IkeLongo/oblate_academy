"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ScribbleOnImage } from "../../../animations/ScribbleImage";
import { GiggleIcon } from "../../../animations/GiggleIcon";

export default function FaithAndFunClient() {
  // This ref should be attached to an element that is inside the server section
  const islandRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(islandRef, { once: true, amount: 0.8 });

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

      // ✅ avoid loops: only update if it actually changed
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

  // optional: keep this stable so ScribbleOnImage doesn't thrash
  const underlineWidth = useMemo(() => (isWrapped ? 400 : 1000), [isWrapped]);

  return (
    // This wrapper is positioned in the server layout container.
    <div ref={islandRef} className="">
      {/* Animated icons (absolute relative to the nearest parent with `relative`) */}
      {inView && (
        <>
          <GiggleIcon
            src="/chalice.svg"
            width={56}
            height={56}
            styleClass="absolute w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] left-0 sm:left-8 top-16 sm:top-28 pointer-events-none"
            className="opacity-30 -rotate-23"
            delay={0.0}
          />
          <GiggleIcon
            src="/crown.svg"
            width={90}
            height={90}
            styleClass="absolute w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] right-0 sm:right-10 top-20 sm:top-28 pointer-events-none"
            className="opacity-30 rotate-21"
            delay={0.15}
          />
          <GiggleIcon
            src="/leaf.svg"
            width={96}
            height={96}
            styleClass="absolute w-[60px] h-[60px] sm:w-[96px] sm:h-[96px] left-6 sm:left-10 bottom-20 md:bottom-10 pointer-events-none"
            className="opacity-40 rotate-134"
            delay={0.3}
          />
          <GiggleIcon
            src="/flower.svg"
            width={96}
            height={96}
            styleClass="absolute w-[70px] h-[70px] sm:w-[96px] sm:h-[96px] right-2 sm:right-10 bottom-16 md:bottom-10 pointer-events-none"
            className="opacity-40"
            delay={0.45}
          />
        </>
      )}

      {/* Title + underline (only this block is client-controlled) */}
      <div className="relative flex justify-center">
        <div className="relative inline-block px-8 sm:px-16 lg:px-24">
          <h3
            ref={titleRef}
            className="text-4xl sm:text-5xl font-extrabold relative z-10 text-center"
            id="faith-fun-title"
          >
            Learn through<wbr />
            <span style={{ whiteSpace: "nowrap" }}> Faith and Fun!</span>
          </h3>

          <div className="absolute left-0 w-full opacity-30 z-0 pointer-events-none">
            <ScribbleOnImage
              src="/title-underline-red.svg"
              alt=""
              width={underlineWidth}
              height={55}
              className={`w-full ${
                isWrapped
                  ? "max-w-[1000px] px-[2rem] -top-4 xs:px-[4rem] xs:-top-4 sm:px-[8rem] sm:-top-4 md:px-[11rem] md:-top-4"
                  : "-top-4 md:-top-4 px-0 sm:px-10 md:px-20"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
