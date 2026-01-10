import Image from "next/image";
import type { PillarCardProps } from "@/app/types/types";

export function PillarCard({
  imageSrc,
  imageAlt,
  title,
  description,
  borderClassName,
  className = "",
}: PillarCardProps) {
  return (
    <div
      className={[
        "bg-white rounded-3xl border-[4px] shadow-sm",
        "p-3 flex flex-col justify-start items-start",
        borderClassName,
        className,
      ].join(" ")}
    >
      <div
        className={[
          "bg-white rounded-2xl border-[3px] shadow-sm flex-1 flex flex-col",
          "px-6 pt-6 pb-5",
          borderClassName,
        ].join(" ")}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 90vw, 360px"
            priority={false}
          />
        </div>

        {/* Title */}
        <h4 className="mt-5 text-center font-extrabold text-base sm:text-lg tracking-wide uppercase text-black">
          {title}
        </h4>

        {/* Description */}
        <p className="mt-3 text-base leading-relaxed text-black/80">
          {description}
        </p>
      </div>
    </div>
  );
}
