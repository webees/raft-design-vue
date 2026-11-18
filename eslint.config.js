import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default defineConfigWithVueTs(
  {
    name: "raft-vue/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },
  {
    name: "raft-vue/files-to-ignore",
    ignores: [
      "**/dist/**",
      "**/coverage/**",
      "**/node_modules/**",
      "design/**",
      "tooling/upstream/.work/**",
      "packages/ui/src/foundation.css",
      "packages/ui/src/themes.css",
      "packages/ui/src/upstream-styles.css",
    ],
  },
  pluginVue.configs["flat/essential"],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: "raft-vue/rules",
    rules: {
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
);
