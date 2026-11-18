<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SplitterPanel } from "reka-ui";
import { cn } from "../../lib/cn";
import { resizable } from "./resizable.variants";

defineOptions({ name: "RaftResizablePanel", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    collapsedSize?: number;
    collapsible?: boolean;
    order?: number;
    sizeUnit?: "%" | "px";
    class?: string;
  }>(),
  {
    defaultSize: undefined,
    minSize: undefined,
    maxSize: undefined,
    collapsedSize: undefined,
    collapsible: false,
    order: undefined,
    sizeUnit: "%",
  },
);

defineEmits<{ collapse: []; expand: []; resize: [size: number] }>();

const attrs = useAttrs();
const styles = resizable();
const panelClass = computed(() => cn(styles.panel(), props.class, attrs.class as string));
</script>

<template>
  <SplitterPanel
    v-bind="{ ...attrs, class: undefined }"
    :default-size="defaultSize"
    :min-size="minSize"
    :max-size="maxSize"
    :collapsed-size="collapsedSize"
    :collapsible="collapsible"
    :order="order"
    :size-unit="sizeUnit"
    data-slot="resizable-panel"
    :class="panelClass"
    @collapse="$emit('collapse')"
    @expand="$emit('expand')"
    @resize="$emit('resize', $event)"
  >
    <slot />
  </SplitterPanel>
</template>
