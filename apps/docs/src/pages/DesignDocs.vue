<script setup lang="ts">
import { computed, ref } from "vue";
import MarkdownIt from "markdown-it";
import docs from "../generated/design-docs.json";

// Upstream Markdown is rendered read-only; raw HTML stays disabled.
const md = new MarkdownIt({ html: false, linkify: true });
const query = ref("");
const activeId = ref(docs[0]?.id ?? "");

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return docs;
  return docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(q) ||
      doc.id.toLowerCase().includes(q) ||
      doc.body.toLowerCase().includes(q),
  );
});

const groups = computed(() => {
  const map = new Map<string, typeof docs>();
  for (const doc of filtered.value) {
    const list = map.get(doc.section) ?? [];
    list.push(doc);
    map.set(doc.section, list);
  }
  return [...map.entries()];
});

const active = computed(() => docs.find((doc) => doc.id === activeId.value));
const rendered = computed(() => (active.value ? md.render(active.value.body) : ""));
</script>

<template>
  <section class="docs-section">
    <h2 class="docs-section-title">Design docs <span>{{ docs.length }} documents</span></h2>
    <p class="docs-section-copy">
      直接读取上游 <code class="docs-mono">design/</code> 的 Markdown，不复制、不改写；
      上游同步后文档自动更新。
    </p>
    <input
      v-model="query"
      class="docs-input"
      type="search"
      placeholder="搜索组件、foundation 或正文…"
      aria-label="搜索设计文档"
    />
    <div class="docs-doc-browser">
      <div class="docs-doc-list">
        <template v-for="[section, items] in groups" :key="section">
          <div class="docs-doc-group">{{ section }}</div>
          <button
            v-for="doc in items"
            :key="doc.id"
            class="docs-doc-item"
            type="button"
            :data-active="activeId === doc.id ? '' : undefined"
            @click="activeId = doc.id"
          >
            {{ doc.title }}
          </button>
        </template>
        <div v-if="!filtered.length" class="docs-empty">没有匹配的文档</div>
      </div>
      <article v-if="active" class="docs-doc-body" v-html="rendered" />
      <div v-else class="docs-empty">选择一篇文档</div>
    </div>
  </section>
</template>

<style scoped>
.docs-input {
  width: 100%;
  height: 38px;
  margin-bottom: 14px;
  padding: 0 12px;
  border: 1.5px solid var(--line-strong);
  border-radius: var(--control-radius);
  background: var(--layer-card);
  font-size: 13px;
  color: var(--foreground);
  outline: none;
}

.docs-input:focus-visible {
  box-shadow: var(--elevation-focus);
}
</style>
