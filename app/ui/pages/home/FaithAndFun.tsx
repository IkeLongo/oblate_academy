"use client";

import Image from "next/image";
import Button from "@mui/material/Button";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { ScribbleOnImage } from "../../animations/ScribbleImage";
import { GiggleIcon } from "../../animations/GiggleIcon";

export default function FaithAndFun() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.8 });
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    if (!titleRef.current) return;

    const el = titleRef.current;

    const checkWrap = () => {
      const styles = window.getComputedStyle(el);

      // line-height can be "normal" → approximate from font-size
      const fontSize = parseFloat(styles.fontSize || "0");
      let lineHeight = parseFloat(styles.lineHeight || "0");

      if (!lineHeight || Number.isNaN(lineHeight)) {
        // "normal" is typically ~1.2 * font-size
        lineHeight = fontSize * 1.2;
      }

      const height = el.getBoundingClientRect().height;

      // how many lines are actually rendered?
      const lines = Math.round(height / lineHeight);

      setIsWrapped(lines > 1);
    };

    checkWrap();

    // ✅ Observe size changes (not just window resize)
    const ro = new ResizeObserver(() => checkWrap());
    ro.observe(el);

    // still keep resize for safety (fonts/load/layout changes)
    window.addEventListener("resize", checkWrap);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", checkWrap);
    };
  }, []);

  useEffect(() => {
    console.log("isWrapped:", isWrapped);
  }, [isWrapped]);

  return (
    <div className="base relative bg-red-300">
      {/* TOP CLOUD BORDER */}
      <div className="absolute -top-5 md:-top-10 left-1/2 -translate-x-1/2 min-w-[110vw] z-30 pointer-events-none">
        <Image
          src="/cloud-border-red.webp"
          alt="Cloud border top"
          width={2400}
          height={300}
          priority
        />
      </div>

      <section ref={sectionRef} className="relative z-20 bg-red-300 text-white">
        <div className="relative max-w-6xl mx-auto">
          {/* Background Illustration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/bible-characters-bg-red.svg"
              alt=""
              width={600}
              height={600}
              className="opacity-20 2xs:-translate-y-24 xs:-translate-y-10 sm:-translate-y-10"
            />
          </div>

          {/* DOT */}
          <Image
            src="/dots.webp"
            alt=""
            width={80}
            height={80}
            className="absolute left-6 top-10 pointer-events-none"
          />

          {/* CHALICE */}
          {inView && (
            <GiggleIcon
              src="/chalice.svg"
              width={56}
              height={56}
              styleClass="absolute w-[40px] h-[40px] sm:w-[56px] sm:h-[56px] left-0 sm:left-8 top-16 sm:top-28 pointer-events-none"
              className="opacity-30 -rotate-23"
              delay={0.0}
            />
          )}

          {/* CROWN */}
          {inView && (
            <GiggleIcon
              src="/crown.svg"
              width={90}
              height={90}
              styleClass="absolute w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] right-0 sm:right-10 top-20 sm:top-28 pointer-events-none"
              className="opacity-30 rotate-21"
              delay={0.15}
            />
          )}

          {/* LEAF */}
          {inView && (
            <GiggleIcon
              src="/leaf.svg"
              width={96}
              height={96}
              styleClass="absolute w-[60px] h-[60px] sm:w-[96px] sm:h-[96px] left-6 sm:left-10 bottom-20 md:bottom-10 pointer-events-none"
              className="opacity-40 rotate-134"
              delay={0.3}
            />
          )}

          {/* FLOWER */}
          {inView && (
            <GiggleIcon
              src="/flower.svg"
              width={96}
              height={96}
              styleClass="absolute w-[70px] h-[70px] sm:w-[96px] sm:h-[96px] right-2 sm:right-10 bottom-16 md:bottom-10 pointer-events-none"
              className="opacity-40"
              delay={0.45}
            />
          )}

          {/* CONTENT */}
          <div className="relative flex flex-col items-center text-center">
            {/* Title with underline behind */}
            <div className="relative flex justify-center">
              <div
                className={`relative inline-block px-8 sm:px-16 lg:px-24 transition-all duration-300 ${
                  isWrapped ? "max-w-md" : ""
                }`}
                style={isWrapped ? { maxWidth: 1000 } : {}}
              >
                <h3
                  ref={titleRef}
                  className="text-4xl sm:text-5xl font-extrabold relative z-10"
                  id="faith-fun-title"
                >
                  Learn through<wbr />
                  <span style={{ whiteSpace: "nowrap" }}> Faith and Fun!</span>
                </h3>
                <div
                  className={`absolute left-0 w-full opacity-30 z-0 pointer-events-none transition-all duration-300 ${
                    isWrapped ? "" : ""
                  }`}
                >
                  <ScribbleOnImage
                    src="/title-underline-red.svg"
                    alt=""
                    width={isWrapped ? 400 : 1000}
                    height={55}
                    className={`w-full ${
                      isWrapped ? "max-w-[1000px] px-[2rem] -top-4 xs:px-[4rem] xs:-top-4 sm:px-[8rem] sm:-top-4 md:px-[11rem] md:-top-4" : "-top-4 md:-top-4 px-0 sm:px-10 md:px-20"
                    }`}
                  />
                </div>
              </div>
            </div>

            <Image
              src="/bible-characters.webp"
              alt="Bible characters"
              width={520}
              height={360}
              className="mt-6"
            />

            <h3 className="mt-20 text-2xl sm:text-3xl font-extrabold">
              What makes our approach special?
            </h3>

            <p className="mt-4 text-xl font-inria max-w-2xl text-white/90">
              Our interactive approach combines traditional Catholic teachings
              with engaging activities that help children understand and
              embrace their faith journey.
            </p>

            <Button
              variant="contained"
              startIcon={
                <Image
                  src="/rosary.svg"
                  alt="Rosary icon"
                  width={24}
                  height={24}
                  style={{ marginRight: 4 }}
                />
              }
              disableElevation
              sx={{
                textTransform: "uppercase",
                borderRadius: "999px",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontFamily: 'Poppins, sans-serif',
                width: { xs: '100%', sm: 'auto' },
                bgcolor: "#DE7878",
                color: "#FDFDFD",
                mt: { xs:8, md:4 },
                border: '2px solid #FDFDFD',
                '&:hover': { border: '2px solid #FDFDFD' },
              }}
            >
              Explore Catholic Faith
            </Button>
          </div>
        </div>
      </section>

      {/* BOTTOM CLOUD BORDER */}
      <div className="absolute -bottom-5 md:-bottom-10 left-1/2 -translate-x-1/2 min-w-[110vw] z-10 pointer-events-none">
        <Image
          src="/cloud-border-red.webp"
          alt="Cloud border bottom"
          width={2400}
          height={300}
        />
      </div>
    </div>
  );
}
