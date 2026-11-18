<script setup lang="ts">
import { AlertDialogPortal } from "reka-ui";

defineOptions({ name: "RaftAlertDialogPortal" });

defineProps<{ to?: string | HTMLElement; forceMount?: boolean; disabled?: boolean }>();
</script>

<template>
  <AlertDialogPortal
    :to="to"
    :force-mount="forceMount"
    :disabled="disabled"
    data-slot="alert-dialog-portal"
  >
    <slot />
  </AlertDialogPortal>
</template>
