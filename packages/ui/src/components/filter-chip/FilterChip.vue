<script setup lang="ts">
import { Primitive } from "reka-ui";
import { filterChip } from "./filter-chip.variants";

defineOptions({ name: "RaftFilterChip", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();

const attrs = useAttrs();
const rootClass = computed(() => filterChip().root({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="filter-chip"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
