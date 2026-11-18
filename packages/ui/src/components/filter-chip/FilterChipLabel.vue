<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { filterChip } from "./filter-chip.variants";

defineOptions({ name: "RaftFilterChipLabel", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();

const attrs = useAttrs();
const labelClass = computed(() =>
  filterChip().label({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="filter-chip-label"
    :class="labelClass"
  >
    <slot />
  </Primitive>
</template>
