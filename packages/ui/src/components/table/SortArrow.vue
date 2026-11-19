<script setup lang="ts">
defineProps<{ sort?: "ascending" | "descending" }>();
</script>

<template>
  <svg
    v-if="sort"
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
  <span v-else aria-hidden="true" data-slot="table-sort-arrow-space" />
</template>
