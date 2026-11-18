<script setup lang="ts">
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownTable", inheritAttrs: false });

const attrs = useAttrs();
const tableClass = computed(() => markdown().table({ className: attrs.class as string }));
</script>

<template>
  <table v-bind="{ ...attrs, class: undefined }" :class="tableClass" data-slot="markdown-table">
    <slot />
  </table>
</template>
