<script setup lang="ts">
import { AlertDialogTrigger } from "reka-ui";

defineOptions({ name: "RaftAlertDialogTrigger" });

defineProps<{ asChild?: boolean; disabled?: boolean }>();
</script>

<template>
  <AlertDialogTrigger :as-child="asChild" :disabled="disabled" data-slot="alert-dialog-trigger">
    <slot />
  </AlertDialogTrigger>
</template>
