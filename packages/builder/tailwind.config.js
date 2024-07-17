/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "../core/src/themes/tailwind.tsx",
    "./examples/src/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
