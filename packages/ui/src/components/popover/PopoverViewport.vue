<script setup lang="ts">
import { popover } from "./popover.variants";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftPopoverViewport", inheritAttrs: false });

const attrs = useAttrs();
const viewportClass = computed(() =>
  popover().viewport({ class: attrs.class as string | undefined }),
);
const viewportAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <div v-bind="viewportAttrs" data-slot="popover-viewport" :class="viewportClass">
    <slot />
  </div>
</template>
