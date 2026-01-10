// app/ui/portableTextComponents.ts
import { PortableTextComponents } from "@portabletext/react";

export const PortableTextComponent: PortableTextComponents = {
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
};