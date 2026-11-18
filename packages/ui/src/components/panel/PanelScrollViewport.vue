<script setup lang="ts">
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { toElement } from "../../lib/dom";
import { panel } from "./panel.variants";

defineOptions({ name: "RaftPanelScrollViewport", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();
const attrs = useAttrs();
const area = ref<InstanceType<typeof ScrollArea> | null>(null);
const rootClass = computed(() => panel().scrollViewport({ className: attrs.class as string }));

defineExpose({ viewport: computed(() => toElement(area.value)) });
</script>

<template>
  <ScrollArea
    ref="area"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="panel-scroll-viewport"
    overscroll="contain"
    :class="rootClass"
  >
    <slot />
  </ScrollArea>
</template>
