<script setup lang="ts">
import manifest from "../../../../tooling/upstream/component-manifest.json";
import lock from "../../../../tooling/upstream/upstream.lock.json";

const filter = ref<"all" | "ported" | "planned" | "not-applicable">("all");
const query = ref("");

const rows = Object.entries(manifest.components).map(([slug, component]) => ({
  slug,
  name: slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "),
  ...component,
  notes: "notes" in component ? (component.notes as string) : "",
}));

const components = computed(() =>
  rows.filter((component) => {
    const byStatus = filter.value === "all" || component.status === filter.value;
    const byQuery =
      !query.value ||
      component.name.toLowerCase().includes(query.value.toLowerCase()) ||
      component.slug.toLowerCase().includes(query.value.toLowerCase());
    return byStatus && byQuery;
  }),
);

const counts = computed(() => {
  const output = { ported: 0, planned: 0, "not-applicable": 0 };
  for (const component of rows) {
    output[component.status as keyof typeof output] += 1;
  }
  return output;
});
</script>

<template>
  <section class="docs-section">
    <h2 class="docs-section-title">
      Migration parity <span>{{ rows.length }} components</span>
    </h2>
    <p class="docs-section-copy">
      清单由 <code class="docs-mono">tooling/upstream/parity.ts</code> 维护。 上游 commit：<code
        class="docs-mono"
        >{{ lock.commit.slice(0, 12) }}</code
      >。 状态为 <code class="docs-mono">ported</code> 的组件必须有 SFC、导出和测试。
    </p>
    <div class="docs-row" style="margin-bottom: 14px">
      <button
        v-for="status in ['all', 'ported', 'planned', 'not-applicable'] as const"
        :key="status"
        class="docs-toggle"
        type="button"
        :data-active="filter === status ? '' : undefined"
        @click="filter = status"
      >
        {{ status }}
        <span v-if="status !== 'all'">({{ counts[status] }})</span>
      </button>
      <input v-model="query" class="docs-input" placeholder="筛选组件…" aria-label="筛选组件" />
    </div>

    <div class="docs-panel" style="overflow: auto; max-height: 70vh; padding: 0">
      <table class="docs-parity-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="component in components" :key="component.slug">
            <td>{{ component.name }}</td>
            <td>
              <code>{{ component.slug }}</code>
            </td>
            <td>
              <span class="docs-status" :data-status="component.status">{{
                component.status
              }}</span>
            </td>
            <td>{{ component.notes ?? "" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.docs-input {
  height: 34px;
  min-width: 220px;
  padding: 0 10px;
  border: 1.5px solid var(--line-strong);
  border-radius: var(--control-radius);
  background: var(--layer-card);
  font-size: 12px;
  outline: none;
}

.docs-toggle[data-active] {
  border-color: var(--sticker-ink);
  box-shadow: 0 0 0 1.5px var(--sticker-edge);
}
</style>
