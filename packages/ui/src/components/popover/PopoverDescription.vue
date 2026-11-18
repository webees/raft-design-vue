<script setup lang="ts">
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverDescription", inheritAttrs: false });

const attrs = useAttrs();
const descriptionClass = computed(() =>
  popover().description({ class: attrs.class as string | undefined }),
);
const descriptionAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <p v-bind="descriptionAttrs" data-slot="popover-description" :class="descriptionClass">
    <slot />
  </p>
</template>
