import type { ReactNode } from "react";
import { Target, Eye } from "lucide-react";

type MissionCardProps = {
  // icon: ReactNode;
  label: string;
  heading: string;
  body: string;
  accentColor: string;
};

function MissionCard({ label, heading, body, accentColor }: MissionCardProps) {
  return (
    <div className="bg-gray-100 rounded-3xl p-0 md:p-8 flex flex-col gap-4">
      {/* <div className={`${accentColor} w-12 h-12 flex items-center justify-center`}>
        {icon}
      </div> */}
      <p className={`text-xs font-poppins font-bold uppercase tracking-widest ${accentColor}`}>
        {label}
      </p>
      <h3 className="font-fredoka font-extrabold text-2xl text-blue-400 leading-tight">
        {heading}
      </h3>
      <p className="font-inria text-base leading-relaxed text-black/70">
        {body}
      </p>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className="base relative bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            Who We Are
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
            Rooted in Faith. Guided by Virtue.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-8">
          <MissionCard
            // icon={<Target size={48} strokeWidth={1.5} />}
            label="Our Mission"
            heading="Forming young disciples of Christ"
            body="Oblate Academy exists to help families and educators nurture children's faith from the earliest years. Through saints, virtues, and joyful learning, we make Catholic formation accessible, engaging, and deeply personal for every child in grades K–5."
            accentColor="text-blue-300"
          />
          <MissionCard
            // icon={<Eye size={48} strokeWidth={1.5} />}
            label="Our Vision"
            heading="A generation rooted in timeless truth"
            body="We envision a world where every Catholic child grows up knowing the saints, living the virtues, and loving the Faith — supported by families and educators equipped with beautiful, purposeful resources."
            accentColor="text-green-500"
          />
        </div>
      </div>
    </section>
  );
}
