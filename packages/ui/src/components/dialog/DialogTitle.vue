<script setup lang="ts">
import { DialogTitle } from "reka-ui";
import { cn } from "../../lib/cn";
import { dialog } from "./dialog.variants";
import { dialogSheet, useDialogSheet } from "./dialog-sheet-context";

defineOptions({ name: "RaftDialogTitle", inheritAttrs: false });

const attrs = useAttrs();
const sheet = useDialogSheet();
const titleClass = computed(() => {
  const className = attrs.class as string | undefined;
  return sheet?.sheet.value
    ? cn(dialog().title(), dialogSheet().title(), className)
    : dialog().title({ className });
});
</script>

<template>
  <DialogTitle v-bind="{ ...attrs, class: undefined }" :class="titleClass" data-slot="dialog-title">
    <slot />
  </DialogTitle>
</template>
