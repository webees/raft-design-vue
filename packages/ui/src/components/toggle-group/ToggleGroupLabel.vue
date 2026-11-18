<script setup lang="ts">
import { Primitive } from "reka-ui";
import { toggleGroup } from "./toggle-group.variants";

defineOptions({ name: "RaftToggleGroupLabel", inheritAttrs: false });

defineProps<{
  as?: string;
  asChild?: boolean;
}>();

const attrs = useAttrs();
const labelClass = computed(() => toggleGroup().label({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="toggle-group-label"
    :class="labelClass"
  >
    <slot />
  </Primitive>
</template>
