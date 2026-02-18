import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    // use describe, test, expect directly
    environment: "jsdom",
    // browser-like environment
    setupFiles: "./src/tests/setup.js",
  },
});
