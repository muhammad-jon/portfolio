/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "hsl(var(--page) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
        text: "hsl(var(--text) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "sans-serif"],
        body: ['"Manrope"', "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -28px hsl(220 35% 10% / 0.4)",
      },
    },
  },
  plugins: [],
};
