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
    <div className="w-full">
      <div className="mx-auto max-w-7xl bg-yellow-100 rounded-3xl mx-4 p-6 md:p-10 mt-10 md:mt-24">
        <div className="rounded-3xl flex flex-col gap-4">
      {/* <div className={`${accentColor} w-12 h-12 flex items-center justify-center`}>
        {icon}
      </div> */}
          <p className={`text-xs font-poppins font-bold uppercase tracking-widest ${accentColor}`}>
            {label}
          </p>
          <h3 className="font-fredoka font-extrabold text-2xl text-green-600 leading-tight capitalize">
            {heading}
          </h3>
          <p className="font-inria !text-xl leading-relaxed text-black/70">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className="base relative bg-blue-100">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        <div className="grid grid-cols-1 gap-16 md:gap-8">
          <MissionCard
            // icon={<Eye size={48} strokeWidth={1.5} />}
            label="Our Vision"
            heading="A generation rooted in timeless truth"
            body={`
              At the Oblate Academy we strive to inspire a generation of 
              children who embody virtue and live out their faith boldly. 
              By looking to the lives of the Catholic saints and the teachings 
              of the Catholic Church, we empower our youth to lead lives 
              defined by compassion, integrity, and a deep-seated love 
              for Christ and one another. 
            `}
            accentColor="text-green-500"
          />
        </div>
      </div>
    </section>
  );
}
