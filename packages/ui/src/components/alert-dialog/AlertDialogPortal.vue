<script setup lang="ts">
import { AlertDialogPortal } from "reka-ui";

defineOptions({ name: "RaftAlertDialogPortal", inheritAttrs: false });

defineProps<{ to?: string | HTMLElement; forceMount?: boolean; disabled?: boolean }>();
</script>

<template>
  <AlertDialogPortal
    v-bind="$attrs"
    :to="to"
    :force-mount="forceMount"
    :disabled="disabled"
    data-slot="alert-dialog-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </AlertDialogPortal>
</template>
