import { defineConfig } from "@rslib/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import AutoImport from "unplugin-auto-import/rspack";
import { autoImportOptions } from "./auto-imports.preset.ts";

export default defineConfig({
  lib: [
    {
      source: {
        entry: {
          index: "./src/index.ts",
          wip: "./src/wip.ts",
        },
      },
      format: "esm",
      bundle: true,
      dts: false,
      output: {
        target: "web",
        distPath: {
          root: "./dist",
        },
      },
    },
  ],
  plugins: [pluginVue()],
  tools: {
    rspack: {
      plugins: [AutoImport(autoImportOptions("src/auto-imports.d.ts"))],
    },
  },
});
