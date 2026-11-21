<script setup lang="ts">
import { popover } from "./popover.variants";
import { usePopoverSize } from "./popover-context";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftPopoverPopup", inheritAttrs: false });

const attrs = useAttrs();
const { size } = usePopoverSize();
const popupClass = computed(() =>
  popover().content({
    size: size(),
    class: attrs.class as string | undefined,
  }),
);
const popupAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <div v-bind="popupAttrs" data-slot="popover-content" :data-size="size()" :class="popupClass">
    <slot />
  </div>
</template>
