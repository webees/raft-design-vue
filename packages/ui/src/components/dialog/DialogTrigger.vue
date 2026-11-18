<script setup lang="ts">
import { DialogTrigger } from "reka-ui";

defineOptions({ name: "RaftDialogTrigger" });

defineProps<{
  asChild?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <DialogTrigger :as-child="asChild" :disabled="disabled" data-slot="dialog-trigger">
    <slot />
  </DialogTrigger>
</template>
