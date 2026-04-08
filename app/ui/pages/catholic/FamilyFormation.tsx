import type { ReactNode } from "react";
import { Heart } from "lucide-react";

type Pillar = {
  component: ReactNode;
  label: string;
  description: string;
};

const PILLARS: Pillar[] = [
  {
    component: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="48" height="48" fill="#FFFFFF">
        <path d="M448 128c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64M328.7 328l22.9 31.5c6.5 8.9 16.3 14.7 27.2 16.1s21.9-1.7 30.4-8.7l88-72c17.1-14 19.6-39.2 5.6-56.3s-39.2-19.6-56.3-5.6l-55.2 45.2l-26.2-36c-15.6-21.5-40.6-34.2-67.2-34.2c-30.9 0-59.2 17.1-73.6 44.4l-48.5 92.5c-20.2 38.5-9.4 85.9 25.6 111.8l53.2 39.3H168c-22.1 0-40 17.9-40 40s17.9 40 40 40h208c17.3 0 32.6-11.1 38-27.5s-.3-34.4-14.2-44.7L283.7 418z" />
      </svg>
    ),
    label: "Family Prayer",
    description: "Daily prayer together forms children's hearts and anchors the family in God.",
  },
  {
    component: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    label: "Sacred Scripture",
    description: "Reading God's Word together at home plants seeds that bear fruit for a lifetime.",
  },
  {
    component: <Heart size={48} strokeWidth={1.5} color="#FFFFFF" />,
    label: "Acts of Service",
    description: "Faith lived outward — in small acts of love, generosity, and care for others.",
  },
];

export default function FamilyFormation() {
  return (
    <section className="base relative bg-blue-400 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-white/60">
            The Domestic Church
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            You are the First Teacher
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-white/80">
            The Second Vatican Council called the family the &ldquo;domestic church&rdquo; — the
            first place where children encounter the love of God. Oblate Academy exists to support
            that sacred vocation, providing tools that make faith formation at home joyful and
            accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.label}
              className="flex flex-col items-center text-center gap-4 bg-white/10 rounded-2xl px-6 py-8"
            >
              <span className="opacity-90">{p.component}</span>
              <div>
                <p className="font-poppins font-bold text-base text-white">
                  {p.label}
                </p>
                <p className="mt-1 font-inria text-sm text-white/75 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
