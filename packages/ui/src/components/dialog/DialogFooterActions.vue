<script setup lang="ts">
import { dialog } from "./dialog.variants";

defineOptions({ name: "RaftDialogFooterActions", inheritAttrs: false });

const attrs = useAttrs();
const actionsClass = computed(() => dialog().footerActions({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="actionsClass"
    data-slot="dialog-footer-actions"
  >
    <slot />
  </div>
</template>
