<script setup lang="ts">
import { computed, useAttrs } from "vue";
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { tasksPanel } from "./tasks-panel.variants";

defineOptions({ name: "RaftTasksPanelViewport", inheritAttrs: false });

defineProps<{
  orientation?: "vertical" | "horizontal" | "both";
  overscroll?: "contain" | "auto";
}>();
const attrs = useAttrs();
const rootClass = computed(() =>
  tasksPanel().viewport({ className: attrs.class as string }),
);
</script>

<template>
  <ScrollArea
    v-bind="{ ...attrs, class: undefined }"
    data-slot="tasks-panel-viewport"
    orientation="both"
    overscroll="contain"
    :class="rootClass"
  >
    <slot />
  </ScrollArea>
</template>
