<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertDialogDescription } from "reka-ui";
import { alertDialog } from "./alert-dialog.variants";

defineOptions({ name: "RaftAlertDialogDescription", inheritAttrs: false });

const attrs = useAttrs();
const descriptionClass = computed(() =>
  alertDialog().description({ className: attrs.class as string }),
);
</script>

<template>
  <AlertDialogDescription
    v-bind="{ ...attrs, class: undefined }"
    :class="descriptionClass"
    data-slot="alert-dialog-description"
  >
    <slot />
  </AlertDialogDescription>
</template>
