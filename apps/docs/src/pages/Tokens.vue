<script setup lang="ts">
import { computed } from "vue";
import tokens from "../../../../packages/ui/src/tokens.json";

interface TokenEntry {
  name: string;
  value: string;
}

const groups = computed(() => {
  const output: { group: string; entries: TokenEntry[] }[] = [];
  for (const [group, raw] of Object.entries(tokens)) {
    if (!raw || typeof raw !== "object" || group.startsWith("$")) continue;
    const entries: TokenEntry[] = [];
    for (const [name, value] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof value === "string") {
        entries.push({ name, value });
      } else if (value && typeof value === "object") {
        for (const [nested, nestedValue] of Object.entries(value as Record<string, unknown>)) {
          if (typeof nestedValue === "string") {
            entries.push({ name: `${name}-${nested}`, value: nestedValue });
          }
        }
      }
    }
    if (entries.length) output.push({ group, entries });
  }
  return output;
});
</script>

<template>
  <section class="docs-section">
    <h2 class="docs-section-title">Tokens <span>generated from tokens.json</span></h2>
    <p class="docs-section-copy">
      <code class="docs-mono">foundation.css</code> 由上游
      <code class="docs-mono">tokens.json</code> 生成。颜色 token 以 OKLCH 表达，
      主题只覆盖语义层，不复制调色板。
    </p>
  </section>

  <section v-for="group in groups" :key="group.group" class="docs-section">
    <h2 class="docs-section-title">{{ group.group }} <span>{{ group.entries.length }}</span></h2>
    <div class="docs-token-grid">
      <div v-for="entry in group.entries" :key="entry.name" class="docs-token">
        <span
          v-if="entry.value.startsWith('oklch') || entry.value.startsWith('#') || entry.value.startsWith('rgb')"
          class="docs-swatch"
          :style="{ background: entry.value }"
        />
        <div>
          <code>{{ entry.name }}</code>
          <strong>{{ entry.value }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>
