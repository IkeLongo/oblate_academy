import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, Star, Home } from "lucide-react";
import { IconCross, IconShieldCheck } from "@tabler/icons-react";

type FaithPillar = {
  icon: ReactNode;
  label: string;
  heading: string;
  body: string;
};

const PILLARS: FaithPillar[] = [
  {
    icon: <IconCross size={48} stroke={1.5} />,
    label: "Pillar 1 of 5",
    heading: "Jesus Christ",
    body: "Every resource flows from a personal relationship with Jesus. We don't just teach about Christ — we invite children to encounter Him through story, prayer, and the witness of the saints who loved Him.",
  },
  {
    icon: <BookOpen size={48} strokeWidth={1.5} />,
    label: "Pillar 2 of 5",
    heading: "Sacred Scripture",
    body: "The Word of God is living and active. Our lessons are woven with Scripture, helping children develop an early and lasting love for the Bible as God's own word spoken directly to them.",
  },
  {
    icon: <IconShieldCheck size={48} stroke={1.5} />,
    label: "Pillar 3 of 5",
    heading: "Virtue",
    body: "Virtue is the foundation of a well-formed conscience. Through age-appropriate activities and the stories of holy men and women, we help children cultivate the virtues they need to live a life of freedom and love.",
  },
  {
    icon: <Star size={48} strokeWidth={1.5} />,
    label: "Pillar 4 of 5",
    heading: "The Saints",
    body: "The saints are friends and models — real people who chose God with everything they had. Their stories spark imagination, inspire heroism, and show children that holiness is possible for everyone.",
  },
  {
    icon: <Home size={48} strokeWidth={1.5} />,
    label: "Pillar 5 of 5",
    heading: "Family & Home",
    body: "Parents are the primary educators of their children in faith. We design every resource to work in the home, supporting families as the domestic church where faith is first caught — and then taught.",
  },
];

function FaithPillarRow({
  icon,
  label,
  heading,
  body,
  reverse = false,
}: FaithPillar & { reverse?: boolean }) {
  return (
    <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 py-14 px-6 mx-auto max-w-4xl`}>
      {/* Icon block */}
      <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-2xl bg-blue-100 text-blue-400">
        {icon}
      </div>

      {/* Text block */}
      <div className={`flex-1 text-center max-w-xl ${reverse ? "lg:text-right" : "lg:text-left"}`}>
        <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300 mb-1">
          {label}
        </p>
        <h3 className="font-fredoka font-extrabold text-2xl sm:text-3xl text-blue-400 leading-tight">
          {heading}
        </h3>
        <p className="mt-3 font-inria text-base leading-relaxed text-black/70 mx-auto lg:mx-0">
          {body}
        </p>
      </div>
    </div>
  );
}

export default function FaithPillars() {
  return (
    <section className="w-full bg-gray-100 py-24">
      <div className="text-center px-6">
        <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
          Five Pillars
        </p>
        <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl md:text-5xl text-blue-400 leading-tight">
          How we Teach the Faith
        </h2>
        <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-black/70">
          Every resource at the Oblate Academy is shaped by five pillars — the foundations of a
          rich and lasting Catholic faith formation.
        </p>
      </div>

      {PILLARS.map((pillar, i) => (
        <div key={pillar.heading} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
          <FaithPillarRow {...pillar} reverse={i % 2 !== 0} />
        </div>
      ))}

      <div className="flex justify-center mt-10">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1 font-poppins font-semibold text-sm rounded-full bg-blue-100 text-blue-500 px-6 py-2 shadow-sm hover:bg-blue-200 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Explore resources →
        </Link>
      </div>
    </section>
  );
}
