<script setup lang="ts">
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { omitAttrs } from "../../lib/attrs";
import { tasksPanel } from "./tasks-panel.variants";

defineOptions({ name: "RaftTasksPanelViewport", inheritAttrs: false });

const props = defineProps<{
  orientation?: "vertical" | "horizontal" | "both";
  overscroll?: "contain" | "auto";
}>();
const attrs = useAttrs();
const scrollAttrs = computed(() => omitAttrs(attrs, "class"));
const rootClass = computed(() => tasksPanel().viewport({ className: attrs.class as string }));
</script>

<template>
  <ScrollArea
    v-bind="scrollAttrs"
    data-slot="tasks-panel-viewport"
    :orientation="props.orientation ?? 'both'"
    :overscroll="props.overscroll ?? 'contain'"
    :class="rootClass"
  >
    <slot />
  </ScrollArea>
</template>
