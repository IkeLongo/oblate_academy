import type { ReactNode } from "react";
import { Star, Shield, Home } from "lucide-react";

type ApproachCard = {
  icon: ReactNode;
  heading: string;
  body: string;
};

const APPROACHES: ApproachCard[] = [
  {
    icon: <Star size={40} strokeWidth={1.5} className="text-yellow-600" />,
    heading: "Learn through Saints",
    body: "Real heroes of faith become guides for the journey. Children see virtue lived out in the stories of men and women who chose God heroically.",
  },
  {
    icon: <Shield size={40} strokeWidth={1.5} className="text-blue-300" />,
    heading: "Practice through Virtue",
    body: "Character is built through repetition. Our activities give children concrete ways to practice virtues like courage, gratitude, and self-control every day.",
  },
  {
    icon: <Home size={40} strokeWidth={1.5} className="text-green-500" />,
    heading: "Grow through Family",
    body: "Faith formation doesn't end at the classroom door. Every resource is designed to work in the home, making the family the center of faith education.",
  },
];

export default function FaithInAction() {
  return (
    <section className="base relative bg-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            Our Approach
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl md:text-5xl text-blue-400 leading-tight">
            Faith in Action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-black/70">
            We believe children learn best by doing. Our resources are hands-on, age-appropriate,
            and grounded in the living tradition of the Church.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {APPROACHES.map((a) => (
            <div
              key={a.heading}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 px-7 py-8"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm">
                {a.icon}
              </div>
              <h3 className="font-fredoka font-extrabold text-xl text-blue-400 leading-snug">
                {a.heading}
              </h3>
              <p className="font-inria text-base leading-relaxed text-black/70">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
