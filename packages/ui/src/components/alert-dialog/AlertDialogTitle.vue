<script setup lang="ts">
import { AlertDialogTitle } from "reka-ui";
import { alertDialog } from "./alert-dialog.variants";

defineOptions({ name: "RaftAlertDialogTitle", inheritAttrs: false });

const attrs = useAttrs();
const titleClass = computed(() => alertDialog().title({ className: attrs.class as string }));
</script>

<template>
  <AlertDialogTitle
    v-bind="{ ...attrs, class: undefined }"
    :class="titleClass"
    data-slot="alert-dialog-title"
  >
    <slot />
  </AlertDialogTitle>
</template>
