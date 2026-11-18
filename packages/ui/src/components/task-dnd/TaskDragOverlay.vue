<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import DragLift from "../drag/DragLift.vue";
import { useTaskDnd } from "./task-dnd-context";
import { taskDnd } from "./task-dnd.recipe";

defineOptions({ name: "RaftTaskDragOverlay", inheritAttrs: false });

const props = defineProps<{
  class?: string;
  container?: Element | DocumentFragment | null;
}>();

const attrs = useAttrs();
const context = useTaskDnd();
const classes = computed(() =>
  taskDnd().overlay({ class: cn(attrs.class as string | undefined, props.class) }),
);
const radiusClass = computed(() => "rounded-container");

onMounted(() => context?.setOverlay(true));
onBeforeUnmount(() => context?.setOverlay(false));
</script>

<template>
  <DragLift :class="radiusClass" :container="props.container">
    <div data-dragging="true" data-slot="task-drag-overlay" :class="classes">
      <slot />
    </div>
  </DragLift>
</template>
