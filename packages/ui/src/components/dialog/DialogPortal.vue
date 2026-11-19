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
  <DialogPortal :to="to" :force-mount="forceMount" :disabled="disabled">
    <div
      v-bind="$attrs"
      data-slot="dialog-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </DialogPortal>
</template>
