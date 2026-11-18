<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownMark", inheritAttrs: false });

const attrs = useAttrs();
const markClass = computed(() => markdown().mark({ className: attrs.class as string }));
</script>

<template>
  <mark v-bind="{ ...attrs, class: undefined }" :class="markClass" data-slot="markdown-mark">
    <slot />
  </mark>
</template>
