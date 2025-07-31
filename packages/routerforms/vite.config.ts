/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: process.env.VITEST ? undefined : "examples",
  test: {
    globals: true,
    browser: {
      provider: "playwright", // or 'webdriverio'
      enabled: true,
      // at least one instance is required
      instances: [{ browser: "chromium" }],
      headless: true,
    },
  },
});
