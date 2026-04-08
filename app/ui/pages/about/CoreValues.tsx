
import { PillarCard } from "@/app/ui/components/cards/PillarCard";
import { IconCross, IconShieldCheck, IconWalk, IconSun } from "@tabler/icons-react";

const VALUES = [
  {
    imageAlt: "Cross icon representing Faith",
    icon: <IconCross size={90} stroke={1.5} className="text-blue-400" />, 
    title: "Faith",
    description:
      "Everything we create flows from a deep love of God and His Church. We hold fast to authentic Catholic teaching in every resource.",
    borderClassName: "border-blue-300",
  },
  {
    imageAlt: "Shield icon representing Virtue",
    icon: <IconShieldCheck size={90} stroke={1.5} className="text-green-500" />, 
    title: "Virtue",
    description:
      "We believe formation in virtue is the foundation of a joyful life. Our resources help children practice courage, patience, kindness, and more.",
    borderClassName: "border-green-400",
  },
  {
    imageAlt: "Walk icon representing Discipleship",
    icon: <IconWalk size={90} stroke={1.5} className="text-yellow-600" />, 
    title: "Discipleship",
    description:
      "We form young disciples by introducing them to the saints and the sacramental life of the Church — making holy living feel achievable and inspiring.",
    borderClassName: "border-yellow-600",
  },
  {
    imageAlt: "Sun icon representing Joy",
    icon: <IconSun size={90} stroke={1.5} className="text-red-400" />, 
    title: "Joy",
    description:
      "Faith should be full of wonder and delight! Our resources are colorful, engaging, and designed to make learning about God an adventure.",
    borderClassName: "border-red-300",
  },
];

export default function CoreValues() {
  return (
    <section className="base relative bg-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            What We Stand For
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {VALUES.map((value) => (
            <PillarCard key={value.title} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
}
