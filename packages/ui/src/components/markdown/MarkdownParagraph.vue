<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownParagraph", inheritAttrs: false });

const attrs = useAttrs();
const paragraphClass = computed(() => markdown().paragraph({ className: attrs.class as string }));
</script>

<template>
  <p v-bind="{ ...attrs, class: undefined }" :class="paragraphClass" data-slot="markdown-paragraph">
    <slot />
  </p>
</template>
