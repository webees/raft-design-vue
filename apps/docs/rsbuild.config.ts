import path from "node:path";
import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  plugins: [pluginVue()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcss()],
      },
    },
  },
  source: {
    entry: {
      index: "./src/main.ts",
    },
  },
  html: {
    template: "./index.html",
  },
  resolve: {
    alias: {
      "@webees/raft-design-vue/styles.css": path.resolve(
        __dirname,
        "../../packages/ui/src/styles.css",
      ),
      "@webees/raft-design-vue": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
    },
  },
  output: {
    distPath: {
      root: "./dist",
    },
  },
});
