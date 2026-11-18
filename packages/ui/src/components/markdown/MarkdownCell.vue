<script setup lang="ts">
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownCell", inheritAttrs: false });

const attrs = useAttrs();
const cellClass = computed(() => markdown().cell({ className: attrs.class as string }));
</script>

<template>
  <td v-bind="{ ...attrs, class: undefined }" :class="cellClass" data-slot="markdown-cell">
    <slot />
  </td>
</template>
