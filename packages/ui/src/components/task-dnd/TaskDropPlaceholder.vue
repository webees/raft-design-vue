<script setup lang="ts">
import type { CSSProperties } from "vue";

import { cn } from "../../lib/cn";
import { drag } from "../drag/drag.recipe";
import { useTaskDnd, useTaskDropState } from "./task-dnd-context";
import { taskDnd } from "./task-dnd.recipe";

defineOptions({ name: "RaftTaskDropPlaceholder", inheritAttrs: false });

const props = defineProps<{
  class?: string;
  id: string | number;
  placement?: "before" | "after";
  style?: string | CSSProperties;
}>();

const attrs = useAttrs();
const context = useTaskDnd();

const dropState = useTaskDropState(() => props.id, { placement: () => props.placement });

const classes = computed(() =>
  drag().placeholder({
    class: taskDnd().placeholder({ class: cn(attrs.class as string | undefined, props.class) }),
  }),
);
const placeholderStyle = computed(() => [
  props.style,
  context?.activeHeight() == null
    ? {}
    : { "--task-dnd-placeholder-height": `${context.activeHeight()}px` },
]);
</script>

<template>
  <div
    v-bind="attrs"
    aria-hidden="true"
    :class="classes"
    :data-drop-state="dropState"
    data-slot="task-drop-placeholder"
    :style="placeholderStyle"
  />
</template>
