<script setup lang="ts">
import { PopoverClose } from "reka-ui";
import { popover } from "./popover.variants";
import { omitAttrs } from "../../lib/attrs";

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
const closeAttrs = computed(() => omitAttrs(attrs, "class"));
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
