<script setup lang="ts">
import { table, type TableAlign } from "./table.variants";
import TableSortButton from "./TableSortButton.vue";

defineOptions({ name: "RaftTableSortableHead", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    scope?: "col" | "row" | "colgroup" | "rowgroup";
    sort?: "ascending" | "descending";
    firstSort?: "ascending" | "descending";
    align?: TableAlign;
  }>(),
  { scope: "col", sort: undefined, firstSort: "ascending", align: "left" },
);

const emit = defineEmits<{ sortChange: [sort: "ascending" | "descending"] }>();
const attrs = useAttrs();
const headClass = computed(() =>
  table({ align: props.align }).head({
    className: [table().sortableHead(), attrs.class as string],
  }),
);
</script>

<template>
  <th
    v-bind="{ ...attrs, class: undefined }"
    :class="headClass"
    :scope="scope"
    :aria-sort="sort"
    data-slot="table-sortable-head"
  >
    <TableSortButton
      :sort="sort"
      :first-sort="firstSort"
      :align="align"
      @sort-change="emit('sortChange', $event)"
    >
      <slot />
    </TableSortButton>
  </th>
</template>
