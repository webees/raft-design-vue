<script setup lang="ts">
import type { CSSProperties } from "vue";

import { cn } from "../../lib/cn";
import { drag } from "../drag/drag.recipe";
import { useTaskDnd, type TaskDropState } from "./task-dnd-context";
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

const dropState = computed<TaskDropState>(() => {
  if (!context || context.activeId() == null) return "idle";
  const over = context.over();
  if (over.overId !== props.id) return "idle";
  if (props.placement && over.overPlacement !== props.placement) return "idle";
  return context.isDropAllowed(context.activeId()!, props.id, over.overData)
    ? "allowed"
    : "blocked";
});

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
