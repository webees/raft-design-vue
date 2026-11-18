<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { PopoverTrigger } from "reka-ui";
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverTrigger", inheritAttrs: false });

withDefaults(
  defineProps<{
    asChild?: boolean;
  }>(),
  {
    asChild: false,
  },
);

const attrs = useAttrs();
const triggerClass = computed(() =>
  popover().trigger({ class: attrs.class as string | undefined }),
);
const triggerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <PopoverTrigger
    v-bind="triggerAttrs"
    :as-child="asChild"
    data-slot="popover-trigger"
    :class="triggerClass"
  >
    <slot />
  </PopoverTrigger>
</template>
