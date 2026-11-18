<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { filePreview } from "./file-preview.variants";

defineOptions({ name: "RaftFilePreviewMedia", inheritAttrs: false });

const attrs = useAttrs();
const mediaClass = computed(() => filePreview().media({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    :class="mediaClass"
    data-slot="file-preview-media"
  >
    <slot />
  </span>
</template>
