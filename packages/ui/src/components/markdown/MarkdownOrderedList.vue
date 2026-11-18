<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownOrderedList", inheritAttrs: false });

const attrs = useAttrs();
const listClass = computed(() =>
  markdown({ ordered: true }).list({ className: attrs.class as string }),
);
</script>

<template>
  <ol v-bind="{ ...attrs, class: undefined }" :class="listClass" data-slot="markdown-list">
    <slot />
  </ol>
</template>
