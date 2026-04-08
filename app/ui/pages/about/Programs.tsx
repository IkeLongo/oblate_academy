import type { ReactNode } from "react";
import { BookOpen, Star, Users, Heart } from "lucide-react";

type ProgramCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  borderColor: string;
  iconColor: string;
};

function ProgramCard({ title, description, icon, borderColor, iconColor }: ProgramCardProps) {
  return (
    <div
      className={`bg-white rounded-3xl border-2 ${borderColor} p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className={iconColor}>{icon}</div>
      <h3 className="font-fredoka font-extrabold text-xl text-blue-400">{title}</h3>
      <p className="font-inria text-base leading-relaxed text-black/70">{description}</p>
    </div>
  );
}

const PROGRAMS = [
  {
    title: "Virtue Builders",
    description:
      "A comprehensive K–5 curriculum exploring the virtues through the lives of the saints. Includes lesson plans, activity pages, and take-home family materials.",
    icon: <BookOpen size={40} strokeWidth={1.5} />,
    borderColor: "border-blue-300",
    iconColor: "text-blue-300",
  },
  {
    title: "Saints & Sacraments",
    description:
      "Engaging study guides and activity kits introducing children to the saints and the beauty of the sacramental life of the Catholic Church.",
    icon: <Star size={40} strokeWidth={1.5} />,
    borderColor: "border-yellow-600",
    iconColor: "text-yellow-700",
  },
  {
    title: "Family Faith Nights",
    description:
      "Ready-to-use facilitation guides for families and co-ops to gather, pray, learn together, and grow in faith through activities designed for all ages.",
    icon: <Users size={40} strokeWidth={1.5} />,
    borderColor: "border-green-400",
    iconColor: "text-green-500",
  },
  {
    title: "Service & Mission",
    description:
      "Age-appropriate service project guides that help children put their faith into action, cultivating generosity, compassion, and love of neighbor.",
    icon: <Heart size={40} strokeWidth={1.5} />,
    borderColor: "border-red-300",
    iconColor: "text-red-400",
  },
];

export default function Programs() {
  return (
    <section className="base relative bg-blue-100">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            What We Offer
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
            Our Programs & Resources
          </h2>
          <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-blue-400/70">
            Everything you need to make Catholic formation a joyful, consistent part of family and
            classroom life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.title} {...program} />
          ))}
        </div>
      </div>
    </section>
  );
}
