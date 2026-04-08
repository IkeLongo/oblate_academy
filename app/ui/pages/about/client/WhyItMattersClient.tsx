"use client";

import { GiggleIcon } from "@/app/ui/animations/GiggleIcon";

export function WhyItMattersClient() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <GiggleIcon
        src="/crown.svg"
        alt=""
        width={70}
        height={40}
        styleClass="absolute left-6 top-18"
        className="opacity-25 w-[50px] h-[50px] md:w-[70px] md:h-[40px] rotate-[-12deg]"
        delay={0}
      />
      <GiggleIcon
        src="/chalice.svg"
        alt=""
        width={40}
        height={75}
        styleClass="absolute right-6 top-18"
        className="opacity-25 w-[50px] h-[50px] md:w-[40px] md:h-[75px] rotate-[18deg]"
        delay={0.2}
      />
    </div>
  );
}
