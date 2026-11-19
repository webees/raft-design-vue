<script setup lang="ts">
import { AlertDialogPortal } from "reka-ui";

defineOptions({ name: "RaftAlertDialogPortal", inheritAttrs: false });

defineProps<{ to?: string | HTMLElement; forceMount?: boolean; disabled?: boolean }>();
</script>

<template>
  <AlertDialogPortal :to="to" :force-mount="forceMount" :disabled="disabled">
    <div
      v-bind="$attrs"
      data-slot="alert-dialog-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </AlertDialogPortal>
</template>
