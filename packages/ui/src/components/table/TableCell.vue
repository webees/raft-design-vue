<script setup lang="ts">
import { table, type TableAlign } from "./table.variants";

defineOptions({ name: "RaftTableCell", inheritAttrs: false });

const props = withDefaults(defineProps<{ align?: TableAlign }>(), { align: "left" });
const attrs = useAttrs();
const cellClass = computed(() =>
  table({ align: props.align }).cell({ className: attrs.class as string }),
);
</script>

<template>
  <td v-bind="{ ...attrs, class: undefined }" :class="cellClass" data-slot="table-cell">
    <slot />
  </td>
</template>
