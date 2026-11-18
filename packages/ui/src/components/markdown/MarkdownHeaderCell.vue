<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownHeaderCell", inheritAttrs: false });

const attrs = useAttrs();
const headerCellClass = computed(() => markdown().headerCell({ className: attrs.class as string }));
</script>

<template>
  <th
    v-bind="{ ...attrs, class: undefined }"
    :class="headerCellClass"
    data-slot="markdown-header-cell"
  >
    <slot />
  </th>
</template>
