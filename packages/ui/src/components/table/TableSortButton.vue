<script setup lang="ts">
import SortArrow from "./SortArrow.vue";
import { table, type TableAlign } from "./table.variants";

defineOptions({ name: "RaftTableSortButton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    sort?: "ascending" | "descending";
    firstSort?: "ascending" | "descending";
    align?: TableAlign;
    asChild?: boolean;
  }>(),
  { sort: undefined, firstSort: "ascending", align: "left", asChild: false },
);

const emit = defineEmits<{ sortChange: [sort: "ascending" | "descending"] }>();
const attrs = useAttrs();

const sorted = computed(() => props.sort !== undefined);
const buttonClass = computed(() =>
  table({ align: props.align, sorted: sorted.value }).sortButton({
    className: attrs.class as string,
  }),
);
const arrowClass = computed(() => table().sortArrow());
const nextSort = computed<"ascending" | "descending">(() => {
  if (!props.sort) return props.firstSort;
  return props.sort === "ascending" ? "descending" : "ascending";
});

function onClick() {
  emit("sortChange", nextSort.value);
}
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    :class="buttonClass"
    data-slot="table-sort-button"
    @click="onClick"
  >
    <SortArrow v-if="align === 'right'" :sort="sort" :class="arrowClass" />
    <slot />
    <SortArrow v-if="align === 'left'" :sort="sort" :class="arrowClass" />
  </button>
</template>
