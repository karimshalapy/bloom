/// <reference types="vitest" />

import alias from "@rollup/plugin-alias";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "gh-pages" ? "/bloom/" : "/",
  plugins: [
    alias({
      entries: [
        {
          find: "@",
          replacement: resolve(projectRootDir, "src"),
        },
      ],
    }),
    react(),
  ],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/tests/setup.ts"],
    coverage: {
      enabled: true,
      provider: "istanbul",
      exclude: ["src/stores", "src/mocks"],
    },
  },
}));
