<script setup lang="ts">
import { DialogPortal } from "reka-ui";

defineOptions({ name: "RaftDialogPortal" });

defineProps<{
  to?: string | HTMLElement;
  forceMount?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <DialogPortal :to="to" :force-mount="forceMount" :disabled="disabled" data-slot="dialog-portal">
    <slot />
  </DialogPortal>
</template>
