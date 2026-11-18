import { defineConfig } from "@rslib/core";
import { pluginVue } from "@rsbuild/plugin-vue";

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
});
