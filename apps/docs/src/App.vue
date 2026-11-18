<script setup lang="ts">
import { computed, ref } from "vue";
import Gallery from "./pages/Gallery.vue";
import Tokens from "./pages/Tokens.vue";
import Themes from "./pages/Themes.vue";
import DesignDocs from "./pages/DesignDocs.vue";
import Parity from "./pages/Parity.vue";
import manifest from "../../../tooling/upstream/component-manifest.json";

type Tab = "gallery" | "tokens" | "themes" | "docs" | "parity";

const tabs: { id: Tab; label: string }[] = [
  { id: "gallery", label: "组件" },
  { id: "tokens", label: "Tokens" },
  { id: "themes", label: "主题" },
  { id: "docs", label: "设计文档" },
  { id: "parity", label: "迁移进度" },
];

const active = ref<Tab>("gallery");
const dark = ref(false);
const theme = ref("boring");

const componentRows = computed(() => Object.entries(manifest.components));
const componentCount = computed(() => componentRows.value.length);
const portedCount = computed(
  () => componentRows.value.filter(([, component]) => component.status === "ported").length,
);

function applyTheme() {
  const root = document.documentElement;
  root.classList.toggle("dark", dark.value);
  root.classList.toggle("light", !dark.value);
  root.dataset.theme = theme.value;
}
</script>

<template>
  <div class="docs-shell">
    <header class="docs-header">
      <div class="docs-brand">
        <span class="docs-mark" aria-hidden="true">R</span>
        <div>
          <p class="docs-eyebrow">webees · raft-design-vue</p>
          <h1>Raft Design Vue</h1>
        </div>
      </div>

      <div class="docs-stats">
        <span>{{ portedCount }} / {{ componentCount }} ported</span>
        <span class="docs-sep">·</span>
        <span>Vue 3 · Reka UI · Tailwind v4</span>
      </div>

      <div class="docs-controls">
        <label class="docs-select">
          <span>主题</span>
          <select v-model="theme" @change="applyTheme">
            <option v-for="name in ['boring','bots','critters','space','desk','food','quest','weather','plants','spooky']" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
        </label>
        <button class="docs-toggle" type="button" @click="dark = !dark; applyTheme()">
          {{ dark ? "Dark" : "Light" }}
        </button>
      </div>
    </header>

    <div class="docs-body">
      <nav class="docs-nav" aria-label="文档导航">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="docs-nav-item"
          :data-active="active === tab.id ? '' : undefined"
          @click="active = tab.id"
        >
          {{ tab.label }}
        </button>
        <div class="docs-nav-note">
          <p>上游规范来源</p>
          <code>botiverse/raft-design</code>
          <p class="docs-muted">MIT · 仅同步 tokens、主题与文档</p>
        </div>
      </nav>

      <main class="docs-main">
        <Gallery v-if="active === 'gallery'" />
        <Tokens v-else-if="active === 'tokens'" />
        <Themes v-else-if="active === 'themes'" />
        <DesignDocs v-else-if="active === 'docs'" />
        <Parity v-else />
      </main>
    </div>
  </div>
</template>
