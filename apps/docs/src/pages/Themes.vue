<script setup lang="ts">
import themes from "../../../../packages/ui/src/themes.json";

const preview = ref("boring");
const names = Object.keys(themes.themes);
const themeMap = themes.themes as Record<
  string,
  { light: Record<string, string>; dark: Record<string, string> }
>;

function select(name: string) {
  preview.value = name;
  document.documentElement.dataset.theme = name;
}

function swatches(name: string) {
  const light = themeMap[name]?.light ?? {};
  return ["--layer-page", "--layer-card", "--foreground", "--attention-400"]
    .map((token) => light[token])
    .filter(Boolean);
}
</script>

<template>
  <section class="docs-section">
    <h2 class="docs-section-title">
      Themes <span>{{ names.length }} palettes</span>
    </h2>
    <p class="docs-section-copy">
      主题通过 <code class="docs-mono">data-theme</code> 生效，刻意不含上游的 Agent 像素
      sprite（品牌资产不随包发布）。点击卡片可实时切换全站主题。
    </p>
    <div class="docs-theme-grid">
      <button
        v-for="name in names"
        :key="name"
        class="docs-theme"
        type="button"
        :data-active="preview === name ? '' : undefined"
        @click="select(name)"
      >
        <span class="docs-theme-name">{{ name }}</span>
        <span class="docs-theme-swatches">
          <i v-for="(color, index) in swatches(name)" :key="index" :style="{ background: color }" />
        </span>
      </button>
    </div>
    <pre
      class="docs-mono"
      style="
        margin-top: 18px;
        padding: 14px;
        border: 1px solid var(--line-hairline);
        border-radius: 6px;
        overflow: auto;
      "
    ><code>&lt;html class="light" data-theme="{{ preview }}"&gt;</code></pre>
  </section>
</template>
