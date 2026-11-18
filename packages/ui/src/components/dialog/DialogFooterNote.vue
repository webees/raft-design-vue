<script setup lang="ts">
import { dialog } from "./dialog.variants";

defineOptions({ name: "RaftDialogFooterNote", inheritAttrs: false });

const attrs = useAttrs();
const noteClass = computed(() => dialog().footerNote({ className: attrs.class as string }));
</script>

<template>
  <p v-bind="{ ...attrs, class: undefined }" :class="noteClass" data-slot="dialog-footer-note">
    <slot />
  </p>
</template>
