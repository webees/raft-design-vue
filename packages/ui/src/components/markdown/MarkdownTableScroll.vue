<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { TableScroll } from "../table";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownTableScroll", inheritAttrs: false });

const attrs = useAttrs();
const tableScrollClass = computed(() =>
  markdown().tableScroll({ className: attrs.class as string }),
);
</script>

<template>
  <TableScroll
    v-bind="{ ...attrs, class: undefined }"
    :class="tableScrollClass"
    data-slot="markdown-table-scroll"
  >
    <slot />
  </TableScroll>
</template>
