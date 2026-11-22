import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { autoImportOptions } from "./auto-imports.preset.ts";

export default defineConfig({
  plugins: [vue(), AutoImport(autoImportOptions("src/auto-imports.d.ts"))],
  test: {
    environment: "jsdom",
    globals: true,
    pool: "threads",
    maxWorkers: 4,
    testTimeout: 20_000,
    hookTimeout: 20_000,
    include: ["src/**/*.test.ts"],
    setupFiles: ["src/test/setup.ts"],
    css: false,
  },
});
