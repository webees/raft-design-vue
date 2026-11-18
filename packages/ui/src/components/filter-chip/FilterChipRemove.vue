<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { X } from "lucide-vue-next";
import { Primitive } from "reka-ui";
import { filterChip } from "./filter-chip.variants";

defineOptions({ name: "RaftFilterChipRemove", inheritAttrs: false });

withDefaults(
  defineProps<{
    label: string;
    as?: string;
    asChild?: boolean;
    disabled?: boolean;
  }>(),
  { as: "button", asChild: false, disabled: false },
);

const attrs = useAttrs();
const removeClass = computed(() =>
  filterChip().remove({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    :disabled="disabled"
    :aria-label="label"
    data-slot="filter-chip-remove"
    :class="removeClass"
  >
    <slot><X aria-hidden="true" /></slot>
  </Primitive>
</template>
