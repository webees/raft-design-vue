<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { table, type TableAlign } from "./table.variants";

defineOptions({ name: "RaftTableHead", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    scope?: "col" | "row" | "colgroup" | "rowgroup";
    align?: TableAlign;
  }>(),
  { scope: "col", align: "left" },
);

const attrs = useAttrs();
const headClass = computed(() =>
  table({ align: props.align }).head({ className: attrs.class as string }),
);
</script>

<template>
  <th
    v-bind="{ ...attrs, class: undefined }"
    :class="headClass"
    :scope="scope"
    data-slot="table-head"
  >
    <slot />
  </th>
</template>
