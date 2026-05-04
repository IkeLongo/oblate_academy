import type { ReactNode } from "react";
import { BookOpen, Star, Users, Heart } from "lucide-react";

type ProgramCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  borderColor: string;
  iconColor: string;
  className: string;
};

function ProgramCard({ title, description, icon, borderColor, iconColor, className }: ProgramCardProps) {
  return (
    <div
      className={`rounded-3xl border-2 ${borderColor} ${className} p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className={iconColor}>{icon}</div>
      <h3 className="font-fredoka font-extrabold text-xl text-black">{title}</h3>
      <p className="font-inria text-base leading-relaxed text-black/70">{description}</p>
    </div>
  );
}

const PROGRAMS = [
  {
    title: "Scripture & Storytelling",
    description:
      "Children connect the Word of God with the inspiring lives of the saints, helping them see how Scripture can guide their choices, strengthen their faith, and come alive through real examples of holiness.",
    icon: <BookOpen size={40} strokeWidth={1.5} />,
    borderColor: "border-blue-300",
    className: "bg-blue-50",
    iconColor: "text-blue-300",
  },
  {
    title: "Creative Expression",
    description:
      "Hands-on crafts and creative activities help children bring each monthly virtue to life. Through art, reflection, and imagination, students are invited to express what they are learning in a joyful and memorable way.",
    icon: <Star size={40} strokeWidth={1.5} />,
    borderColor: "border-yellow-600",
    className: "bg-yellow-50",
    iconColor: "text-yellow-700",
  },
  {
    title: "Reflection & Prayer",
    description:
      "Quiet moments of prayer give children space to listen to the Holy Spirit, reflect on what they have learned, and grow in a deeper relationship with God through stillness, gratitude, and faith.",
    icon: <Users size={40} strokeWidth={1.5} />,
    borderColor: "border-green-400",
    className: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    title: "Parent Guides",
    description:
      "Simple, meaningful resources help families continue the conversation at home. Parent guides support prayer, discussion, and practical ways to practice each virtue throughout daily family life.",
    icon: <Heart size={40} strokeWidth={1.5} />,
    borderColor: "border-red-300",
    className: "bg-red-50",
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
          <p className="mt-4 max-w-2xl mx-auto font-inria text-base sm:text-lg leading-relaxed text-neutral-800">
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
