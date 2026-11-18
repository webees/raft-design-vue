<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownLink", inheritAttrs: false });

const attrs = useAttrs();
const linkClass = computed(() => markdown().link({ className: attrs.class as string }));
</script>

<template>
  <a v-bind="{ ...attrs, class: undefined }" :class="linkClass" data-slot="markdown-link">
    <slot />
  </a>
</template>
