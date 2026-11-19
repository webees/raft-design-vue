import path from "node:path";
import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import tailwindcss from "@tailwindcss/postcss";
import AutoImport from "unplugin-auto-import/rspack";
import { autoImportOptions } from "../../packages/ui/auto-imports.preset.ts";

export default defineConfig({
  plugins: [pluginVue()],
  tools: {
    rspack: {
      plugins: [AutoImport(autoImportOptions("../../packages/ui/src/auto-imports.d.ts"))],
    },
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
