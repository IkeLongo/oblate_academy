
import { PillarCard } from "@/app/ui/components/cards/PillarCard";
import { IconCross, IconFlame , IconWalk, IconSun } from "@tabler/icons-react";

const VALUES = [
  {
    imageAlt: "Cross icon representing Faith as Foundation",
    icon: <IconCross size={90} stroke={1.5} className="text-blue-400" />,
    title: "Faith as Foundation",
    description:
      "We place God at the center of every lesson, activity, and interaction. Our resources are rooted in the Catholic faith and designed to help children see Christ as the foundation for learning, growing, and living with purpose.",
    borderClassName: "border-blue-300",
    className: "bg-blue-50",
  },
  {
    imageAlt: "Flame icon representing Virtue through Action",
    icon: <IconFlame  size={90} stroke={1.5} className="text-green-500" />,
    title: "Virtue through Action",
    description:
      "We believe virtue is learned not only through words, but through daily practice. Our lessons encourage children to live out kindness, patience, courage, humility, and love in real situations at home, in school, and within their community.",
    borderClassName: "border-green-400",
    className: "bg-green-50",
  },
  {
    imageAlt: "Walk icon representing Discipleship by Example",
    icon: <IconWalk size={90} stroke={1.5} className="text-yellow-600" />,
    title: "Discipleship by Example",
    description:
      "We help children understand that following Christ begins with joyful witness. Through the lives of the saints, prayer, and everyday acts of faith, students are encouraged to lead others toward Christ by the way they live.",
    borderClassName: "border-yellow-600",
    className: "bg-yellow-50",
  },
  {
    imageAlt: "Sun icon representing Inclusion, Joy, and Community",
    icon: <IconSun size={90} stroke={1.5} className="text-red-400" />,
    title: "Inclusion, Joy, and Community",
    description:
      "We strive to create a welcoming space where every child feels seen, loved, and valued. Our resources celebrate the joy of the Gospel while supporting families and educators in building a faith-filled community where every child belongs.",
    borderClassName: "border-red-300",
    className: "bg-red-50",
  },
];

export default function CoreValues() {
  return (
    <section className="base relative bg-blue-100">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            What We Stand For
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
            Our Core Values
          </h2>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-neutral-800 text-center">
            Our community is built upon four essential pillars that guide everything we do in the classroom.
          </p>
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
