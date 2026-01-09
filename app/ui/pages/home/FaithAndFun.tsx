"use client";

import Image from "next/image";
import Button from "@mui/material/Button";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ScribbleOnImage } from "../../animations/ScribbleImage";
import { GiggleIcon } from "../../animations/GiggleIcon";

export default function FaithAndFun() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.8 });

  return (
    <div className="base relative bg-red-300">
      {/* TOP CLOUD BORDER */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 min-w-[110vw] z-30 pointer-events-none">
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
              className="opacity-20 -translate-y-10"
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
              styleClass="absolute left-8 top-28 pointer-events-none"
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
              styleClass="absolute right-10 top-28 pointer-events-none"
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
              styleClass="absolute left-10 bottom-10 pointer-events-none"
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
              styleClass="absolute right-10 bottom-10 pointer-events-none"
              className="opacity-40"
              delay={0.45}
            />
          )}

          {/* CONTENT */}
          <div className="relative flex flex-col items-center text-center">
            {/* Title with underline behind */}
            <div className="relative flex justify-center">
              <div className="relative inline-block px-8 sm:px-16 lg:px-24">
                <h3
                  className="text-4xl sm:text-5xl font-extrabold relative z-10"
                  id="faith-fun-title"
                >
                  Learn through Faith and Fun!
                </h3>
                <div className="absolute left-0 top-8 w-full px-20 opacity-30 z-0 pointer-events-none">
                  <ScribbleOnImage
                    src="/title-underline-red.svg"
                    alt=""
                    width={834}
                    height={72}
                    className="w-full"
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
                bgcolor: "transparent",
                color: "#FDFDFD",
                mt: 4,
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
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 min-w-[110vw] z-10 pointer-events-none">
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
