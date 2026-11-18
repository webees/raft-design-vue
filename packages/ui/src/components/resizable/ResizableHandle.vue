<script setup lang="ts">
import { computed, inject, useAttrs, type Ref } from "vue";
import { SplitterResizeHandle } from "reka-ui";
import { cn } from "../../lib/cn";
import { resizable } from "./resizable.variants";
import { RESIZABLE_ORIENTATION_KEY, type ResizableOrientation } from "./context";

defineOptions({ name: "RaftResizableHandle", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    ariaLabel?: string;
    class?: string;
  }>(),
  {
    disabled: false,
    ariaLabel: "Resize panels",
  },
);

const attrs = useAttrs();
const styles = resizable();
const groupOrientation = inject<Ref<ResizableOrientation>>(
  RESIZABLE_ORIENTATION_KEY,
  computed(() => "horizontal"),
);
const handleOrientation = computed<ResizableOrientation>(() =>
  groupOrientation.value === "horizontal" ? "vertical" : "horizontal",
);
const handleClass = computed(() => cn(styles.handle(), props.class, attrs.class as string));
</script>

<template>
  <SplitterResizeHandle
    v-bind="{ ...attrs, class: undefined }"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :data-orientation="handleOrientation"
    data-slot="resizable-handle"
    :class="handleClass"
  />
</template>
