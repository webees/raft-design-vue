<script setup lang="ts">
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
    <svg
      v-if="align === 'right' && sort"
      :class="arrowClass"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      data-slot="table-sort-arrow"
    >
      <path
        :d="sort === 'descending' ? 'M3 4.5l3 3 3-3' : 'M3 7.5l3-3 3 3'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
    <span
      v-else-if="align === 'right'"
      :class="arrowClass"
      aria-hidden="true"
      data-slot="table-sort-arrow-space"
    />
    <slot />
    <svg
      v-if="align === 'left' && sort"
      :class="arrowClass"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      data-slot="table-sort-arrow"
    >
      <path
        :d="sort === 'descending' ? 'M3 4.5l3 3 3-3' : 'M3 7.5l3-3 3 3'"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="square"
      />
    </svg>
    <span
      v-else-if="align === 'left'"
      :class="arrowClass"
      aria-hidden="true"
      data-slot="table-sort-arrow-space"
    />
  </button>
</template>
