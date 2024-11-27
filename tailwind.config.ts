import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': 'var(--font-open-sans)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          // sm: "2rem",
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {

        'xl': '1350px',
        // => @media (min-width: 1536px) { ... }
      }
    },
  },
  plugins: [],
} satisfies Config;
