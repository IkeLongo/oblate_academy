// app/ui/portableTextComponents.ts
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-xl font-semibold text-black leading-relaxed mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-extrabold text-blue-400 mt-6 mb-3">
        {children}
      </h2>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).quality(80).auto("format").fit("max").url();
      return (
        <div className="not-prose mx-auto">
          <Image
            src={src}
            alt={value?.alt || ""}
            width={1200}
            height={800}
            className="rounded-lg w-full h-auto object-contain"
          />
        </div>
      );
    },
  },
};
