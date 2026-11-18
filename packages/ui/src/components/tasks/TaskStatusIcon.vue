<script setup lang="ts">
import { computed, useAttrs } from "vue";
import type { TaskStatusId } from "../../lib/task-status";

defineOptions({ name: "RaftTaskStatusIcon", inheritAttrs: false });

const props = defineProps<{ status: TaskStatusId }>();
const attrs = useAttrs();

const PIXEL_STYLE: Record<TaskStatusId, Record<string, string>> = {
  backlog: {
    fill: "none",
    stroke: "var(--line-strong)",
  },
  todo: { fill: "var(--task-status-todo)", stroke: "var(--sticker-ink)" },
  "in-progress": {
    fill: "var(--task-status-in-progress)",
    stroke: "var(--sticker-ink)",
  },
  "in-review": {
    fill: "var(--task-status-in-review)",
    stroke: "var(--sticker-ink)",
  },
  done: { fill: "var(--task-status-done)", stroke: "var(--sticker-ink)" },
  closed: { fill: "var(--task-status-closed)", stroke: "var(--sticker-ink)" },
};

const pixelStyle = computed(() => PIXEL_STYLE[props.status]);
</script>

<template>
  <svg
    aria-hidden="true"
    data-slot="task-status-icon"
    :data-status="status"
    width="10"
    height="10"
    overflow="visible"
    v-bind="attrs"
  >
    <rect
      x="50%"
      y="50%"
      width="8.5"
      height="8.5"
      rx="1.25"
      stroke-width="1.5"
      transform="translate(-4.25 -4.25)"
      :style="pixelStyle"
    />
  </svg>
</template>
