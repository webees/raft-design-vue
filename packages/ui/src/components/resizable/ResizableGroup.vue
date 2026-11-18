<script setup lang="ts">
import { computed, provide, toRef, useAttrs } from "vue";
import { SplitterGroup } from "reka-ui";
import { cn } from "../../lib/cn";
import { resizable, type ResizableOrientation } from "./resizable.variants";
import { RESIZABLE_ORIENTATION_KEY } from "./context";

defineOptions({ name: "RaftResizableGroup", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    orientation?: ResizableOrientation;
    autoSaveId?: string | null;
    keyboardResizeBy?: number | null;
    class?: string;
  }>(),
  {
    orientation: "horizontal",
    autoSaveId: null,
    keyboardResizeBy: null,
  },
);

const emit = defineEmits<{ layout: [sizes: number[]] }>();
const attrs = useAttrs();
const styles = resizable();

provide(RESIZABLE_ORIENTATION_KEY, toRef(props, "orientation"));

const groupClass = computed(() => cn(styles.group(), props.class, attrs.class as string));
</script>

<template>
  <SplitterGroup
    v-bind="{ ...attrs, class: undefined }"
    :direction="orientation"
    :auto-save-id="autoSaveId"
    :keyboard-resize-by="keyboardResizeBy"
    data-slot="resizable-group"
    :data-orientation="orientation"
    :class="groupClass"
    @layout="emit('layout', $event)"
  >
    <slot />
  </SplitterGroup>
</template>
