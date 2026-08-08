/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vitejs.dev/config/
export default defineConfig({
  // Tailwind is only needed for the examples testbed, not for unit tests.
  plugins: [react(), ...(process.env.VITEST ? [] : [tailwindcss()])],
  root: process.env.VITEST ? undefined : "examples",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});
