<script setup lang="ts">
import { DialogRoot } from "reka-ui";
import { OverlayLayer } from "../../lib/overlay-depth";

defineOptions({ name: "RaftDialog", inheritAttrs: false });

withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
    modal?: boolean;
  }>(),
  { open: undefined, defaultOpen: false, modal: true },
);

const emit = defineEmits<{
  "update:open": [open: boolean];
}>();
</script>

<template>
  <DialogRoot
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    data-slot="dialog"
    @update:open="emit('update:open', $event)"
  >
    <OverlayLayer kind="dialog" :modal="modal !== false">
      <slot />
    </OverlayLayer>
  </DialogRoot>
</template>
