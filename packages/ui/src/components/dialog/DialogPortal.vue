<script setup lang="ts">
import { DialogPortal } from "reka-ui";

defineOptions({ name: "RaftDialogPortal", inheritAttrs: false });

defineProps<{
  to?: string | HTMLElement;
  forceMount?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <DialogPortal
    v-bind="$attrs"
    :to="to"
    :force-mount="forceMount"
    :disabled="disabled"
    data-slot="dialog-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </DialogPortal>
</template>
