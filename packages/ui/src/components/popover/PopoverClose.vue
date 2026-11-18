<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { PopoverClose } from "reka-ui";
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverClose", inheritAttrs: false });

withDefaults(
  defineProps<{
    asChild?: boolean;
  }>(),
  {
    asChild: false,
  },
);

const attrs = useAttrs();
const closeClass = computed(() => popover().close({ class: attrs.class as string | undefined }));
const closeAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <PopoverClose
    v-bind="closeAttrs"
    :as-child="asChild"
    data-slot="popover-close"
    :class="closeClass"
  >
    <slot />
  </PopoverClose>
</template>
