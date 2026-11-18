<script setup lang="ts">
import { filePreview } from "./file-preview.variants";

defineOptions({ name: "RaftFilePreview", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() => filePreview().root({ className: attrs.class as string }));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" :class="rootClass" data-slot="file-preview">
    <slot />
  </span>
</template>
