<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectLabel } from "reka-ui";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectGroupLabel", inheritAttrs: false });

const attrs = useAttrs();
const labelClass = computed(() => select().groupLabel({ className: attrs.class as string }));
</script>

<template>
  <SelectLabel
    v-bind="{ ...attrs, class: undefined }"
    :class="labelClass"
    data-slot="select-group-label"
  >
    <slot />
  </SelectLabel>
</template>
