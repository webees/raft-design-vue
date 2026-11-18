<script setup lang="ts">
import { PopoverArrow, useDirection } from "reka-ui";
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverArrow", inheritAttrs: false });

const attrs = useAttrs();
const arrowClass = computed(() => popover().arrow({ class: attrs.class as string | undefined }));
const direction = useDirection();
</script>

<template>
  <PopoverArrow
    :data-dir="direction"
    v-bind="{ ...attrs, class: undefined }"
    :width="8"
    :height="8"
    data-slot="popover-arrow"
    :class="arrowClass"
  >
    <path d="M4 0 8 4 4 8 0 4Z" />
  </PopoverArrow>
</template>
