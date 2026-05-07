// app/ui/portableTextComponents.ts
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";

export const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-poppins text-xl text-black leading-relaxed mb-4">
        {children}
      </p>
    ),

    h1: ({ children }) => (
      <h1 className="font-poppins font-bold text-4xl text-black leading-tight mt-8 mb-4">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="font-poppins font-bold text-3xl text-black leading-tight mt-7 mb-4">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="font-poppins font-semibold text-2xl text-black leading-snug mt-6 mb-3">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="font-poppins font-semibold text-xl text-black leading-snug mt-5 mb-3">
        {children}
      </h4>
    ),

    h5: ({ children }) => (
      <h5 className="font-poppins font-medium text-lg text-black leading-snug mt-4 mb-2">
        {children}
      </h5>
    ),

    h6: ({ children }) => (
      <h6 className="font-poppins font-medium text-base uppercase tracking-wide text-black leading-snug mt-4 mb-2">
        {children}
      </h6>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-2xl border-l-4 border-yellow-300 bg-gradient-to-r from-yellow-50 to-blue-50 px-6 py-5 shadow-sm">
        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none text-black font-serif">
            “
          </span>

          <div className="font-poppins text-xl italic text-black leading-relaxed">
            {children}
          </div>
        </div>
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="font-poppins list-disc pl-6 mb-4 space-y-2 text-black">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="font-poppins list-decimal pl-6 mb-4 space-y-2 text-black">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="font-poppins !text-xl text-black leading-relaxed">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="font-poppins !text-xl text-black leading-relaxed">
        {children}
      </li>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-extrabold text-black">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-black">
        {children}
      </em>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";

      return (
        <a
          href={href}
          className="font-bold text-blue-400 underline underline-offset-4"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      const src = urlFor(value)
        .width(1200)
        .quality(80)
        .auto("format")
        .fit("max")
        .url();

      const alignmentClass: Record<string, string> = {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
      };

      const widthClass: Record<string, string> = {
        xs: "w-3xs",
        sm: "w-sm",
        md: "w-md",
        lg: "w-lg",
        full: "w-full",
      };

      const align = alignmentClass[value?.alignment ?? "center"] ?? "mx-auto";
      const width = widthClass[value?.width ?? "full"] ?? "w-full";

      return (
        <div className={`not-prose my-6 max-w-full ${align} ${width}`}>
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
