import Image from "next/image";
import { Church } from "lucide-react";
import { WhyItMattersClient } from "./client/WhyItMattersClient";
import type { ReactNode } from "react";

type Reason = {
  icon?: string;
  component?: ReactNode;
  label: string;
};

const REASONS: Reason[] = [
  {
    component: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="52" height="52" fill="#FFFFFF">
        <path d="M20 30h-3a2 2 0 0 1-2-2v-5h2v5h3v-5h2v-4a1 1 0 0 0-1-1h-8.72l-2-6H4a1 1 0 0 0-1 1v6h2v9h4v-7h2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3.003 3.003 0 0 1 3-3h6.28a2 2 0 0 1 1.897 1.367L13.72 16H21a3.003 3.003 0 0 1 3 3v4a2 2 0 0 1-2 2v3a2 2 0 0 1-2 2m8 0h-2V19h3v-6a1 1 0 0 0-1-1h-4v-2h4a3.003 3.003 0 0 1 3 3v6a2 2 0 0 1-2 2h-1zM7 9a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2m18 6a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4m0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2" />
        <path d="M18.5 15a3.5 3.5 0 1 1 3.5-3.5a3.504 3.504 0 0 1-3.5 3.5m0-5a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5" />
      </svg>
    ),
    label: "Families are the first school of faith.",
  },
  {
    component: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="52" height="52" fill="#FFFFFF">
        <path d="M448 128c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64M328.7 328l22.9 31.5c6.5 8.9 16.3 14.7 27.2 16.1s21.9-1.7 30.4-8.7l88-72c17.1-14 19.6-39.2 5.6-56.3s-39.2-19.6-56.3-5.6l-55.2 45.2l-26.2-36c-15.6-21.5-40.6-34.2-67.2-34.2c-30.9 0-59.2 17.1-73.6 44.4l-48.5 92.5c-20.2 38.5-9.4 85.9 25.6 111.8l53.2 39.3H168c-22.1 0-40 17.9-40 40s17.9 40 40 40h208c17.3 0 32.6-11.1 38-27.5s-.3-34.4-14.2-44.7L283.7 418z" />
      </svg>
    ),
    label: "Children who learn virtues early carry them for life.",
  },
  {
    component: <Church size={52} strokeWidth={1.5} />,
    label: "Beautiful resources make learning the faith a joy.",
  },
];

export default function WhyItMatters() {
  return (
    <section className="base relative bg-red-300 text-white overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Decorative corner icons — animated via client island */}
        <WhyItMattersClient />

        {/* Heading */}
        <div className="relative text-center mb-8">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-white/70">
            Why It Matters
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            Formation shapes eternity.
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-white/80">
            The years of childhood are a sacred gift — a formative window when faith can take deep
            root. The Oblate Academy exists to make the most of that window, one resource at a time.
          </p>
        </div>

        {/* Bible characters — in flow, below heading, cards overlap the bottom */}
        <div className="relative flex justify-center pointer-events-none select-none">
          {/* SVG background sits behind the webp */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/bible-characters-bg-red.svg"
              alt=""
              width={520}
              height={520}
              className="opacity-30"
            />
          </div>
          <Image
            src="/bible-characters.webp"
            alt="Bible characters"
            width={520}
            height={360}
            className="relative z-10"
          />
        </div>

        {/* Reason pills — negative margin pulls them up to overlap the image bottom */}
        <div className="relative z-10 -mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {REASONS.map((r) => (
            <div
              key={r.label}
              className="flex flex-col items-center text-center gap-4 bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-8"
            >
              {r.component ? (
                <span className="opacity-90">{r.component}</span>
              ) : r.icon ? (
                <Image src={r.icon} alt="" width={52} height={52} className="opacity-90" />
              ) : null}
              <p className="font-poppins font-semibold text-base text-white leading-snug">
                {r.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
