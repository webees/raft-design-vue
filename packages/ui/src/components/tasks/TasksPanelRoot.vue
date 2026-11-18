<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { tasksPanel } from "./tasks-panel.variants";

defineOptions({ name: "RaftTasksPanelRoot", inheritAttrs: false });
const attrs = useAttrs();
const rootClass = computed(() =>
  tasksPanel().root({ className: attrs.class as string }),
);
</script>

<template>
  <section
    v-bind="{ ...attrs, class: undefined }"
    data-slot="tasks-panel-root"
    :class="rootClass"
  >
    <slot />
  </section>
</template>
