<script setup lang="ts">
import { SelectLabel } from "reka-ui";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectLabel", inheritAttrs: false });

const attrs = useAttrs();
const labelClass = computed(() => select().label({ className: attrs.class as string }));
</script>

<template>
  <SelectLabel
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'select-label'"
    :class="labelClass"
  >
    <slot />
  </SelectLabel>
</template>
