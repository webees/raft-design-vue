<script setup lang="ts">
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverActions", inheritAttrs: false });

const attrs = useAttrs();
const actionsClass = computed(() =>
  popover().actions({ class: attrs.class as string | undefined }),
);
const actionsAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="actionsAttrs" data-slot="popover-actions" :class="actionsClass">
    <slot />
  </div>
</template>
