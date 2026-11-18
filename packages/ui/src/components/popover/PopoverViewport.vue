<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverViewport", inheritAttrs: false });

const attrs = useAttrs();
const viewportClass = computed(() =>
  popover().viewport({ class: attrs.class as string | undefined }),
);
const viewportAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="viewportAttrs" data-slot="popover-viewport" :class="viewportClass">
    <slot />
  </div>
</template>
