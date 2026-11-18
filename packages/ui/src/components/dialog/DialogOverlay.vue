<script setup lang="ts">
import { DialogOverlay } from "reka-ui";
import { useParentOverlayKind } from "../../lib/overlay-depth";
import { dialog } from "./dialog.variants";

defineOptions({ name: "RaftDialogOverlay", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    layer?: 0 | 1;
    nested?: boolean;
    forceMount?: boolean;
    asChild?: boolean;
  }>(),
  { layer: 0, nested: false, forceMount: false, asChild: false },
);

const attrs = useAttrs();
const nested = computed(() => props.nested || useParentOverlayKind() !== null);
const overlayClass = computed(() => {
  const { overlay } = dialog({ layer: props.layer, nested: nested.value });
  return overlay({ className: attrs.class as string });
});
</script>

<template>
  <DialogOverlay
    v-bind="{ ...attrs, class: undefined }"
    :class="overlayClass"
    :force-mount="forceMount"
    :as-child="asChild"
    :data-slot="(attrs['data-slot'] as string) ?? 'dialog-overlay'"
    data-raft-ui-overlay=""
  >
    <slot />
  </DialogOverlay>
</template>
