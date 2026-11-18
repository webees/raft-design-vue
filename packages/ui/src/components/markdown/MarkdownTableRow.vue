<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownTableRow", inheritAttrs: false });

const attrs = useAttrs();
const tableRowClass = computed(() => markdown().tableRow({ className: attrs.class as string }));
</script>

<template>
  <tr v-bind="{ ...attrs, class: undefined }" :class="tableRowClass" data-slot="markdown-table-row">
    <slot />
  </tr>
</template>
