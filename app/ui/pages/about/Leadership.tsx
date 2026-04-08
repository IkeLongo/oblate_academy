import Image from "next/image";

type LeaderCardProps = {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  imageAlt: string;
};

function LeaderCard({ name, title, bio, imageSrc, imageAlt }: LeaderCardProps) {
  return (
    <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-[280px_1fr] max-w-3xl mx-auto">
      {/* Photo */}
      <div className="relative h-72 md:h-auto min-h-[280px]">
        {/* TODO: Replace src with the actual founder portrait photo */}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col justify-center gap-3 px-8 py-10">
        <div>
          <h3 className="font-fredoka font-extrabold text-2xl text-blue-400">{name}</h3>
          <p className="font-poppins font-semibold text-sm text-blue-300 uppercase tracking-wide mt-0.5">
            {title}
          </p>
        </div>
        <p className="font-inria text-base leading-relaxed text-black/70">{bio}</p>
      </div>
    </div>
  );
}

export default function Leadership() {
  return (
    <section className="base relative bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-poppins font-bold uppercase tracking-widest text-blue-300">
            The People Behind the Mission
          </p>
          <h2 className="mt-2 font-fredoka font-extrabold text-3xl sm:text-4xl text-blue-400 leading-tight">
            Meet Our Founder
          </h2>
        </div>

        <LeaderCard
          name="Marisela Guillen"
          title="Founder & Director"
          bio="Marisela is a lifelong Catholic, mother, and educator who has devoted her career to helping children fall in love with their faith. After years of creating resources for her own family and classroom, she launched the Oblate Academy to share those tools with families everywhere. Her passion is making Catholic formation accessible, joyful, and deeply rooted in the tradition of the Church."
          imageSrc="/desciple-of-christ.webp"
          imageAlt="Marisela Guillen, Founder of Oblate Academy"
        />
      </div>
    </section>
  );
}
