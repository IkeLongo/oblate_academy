import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        inria: ["var(--font-inria)", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;