<script setup lang="ts">
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverTitle", inheritAttrs: false });

const attrs = useAttrs();
const titleClass = computed(() => popover().title({ class: attrs.class as string | undefined }));
const titleAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <h2 v-bind="titleAttrs" data-slot="popover-title" :class="titleClass">
    <slot />
  </h2>
</template>
