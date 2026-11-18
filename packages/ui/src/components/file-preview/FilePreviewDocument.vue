<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { filePreview } from "./file-preview.variants";

defineOptions({ name: "RaftFilePreviewDocument", inheritAttrs: false });

const attrs = useAttrs();
const documentClass = computed(() => filePreview().document({ className: attrs.class as string }));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    :class="documentClass"
    data-slot="file-preview-document"
  >
    <span class="block h-0.5 w-full rounded-full bg-ink-10" />
    <span class="flex gap-0.5">
      <span class="h-0.5 w-1/3 rounded-full bg-ink-10" />
      <span class="h-0.5 w-2/3 rounded-full bg-ink-10" />
    </span>
    <span class="flex gap-0.5">
      <span class="h-0.5 w-1/2 rounded-full bg-ink-10" />
      <span class="h-0.5 w-1/2 rounded-full bg-ink-10" />
    </span>
    <span class="flex gap-0.5">
      <span class="h-0.5 w-1/3 rounded-full bg-ink-10" />
      <span class="h-0.5 w-2/3 rounded-full bg-ink-10" />
    </span>
    <slot />
  </span>
</template>
