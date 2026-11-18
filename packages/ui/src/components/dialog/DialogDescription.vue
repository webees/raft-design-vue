<script setup lang="ts">
import { DialogDescription } from "reka-ui";
import { dialog } from "./dialog.variants";

defineOptions({ name: "RaftDialogDescription", inheritAttrs: false });

const attrs = useAttrs();
const descriptionClass = computed(() => dialog().description({ className: attrs.class as string }));
</script>

<template>
  <DialogDescription
    v-bind="{ ...attrs, class: undefined }"
    :class="descriptionClass"
    data-slot="dialog-description"
  >
    <slot />
  </DialogDescription>
</template>
