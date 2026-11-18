<script setup lang="ts">
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverSeparator", inheritAttrs: false });

const attrs = useAttrs();
const separatorClass = computed(() =>
  popover().separator({ class: attrs.class as string | undefined }),
);
const separatorAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div
    v-bind="separatorAttrs"
    role="separator"
    aria-orientation="horizontal"
    data-slot="popover-separator"
    :class="separatorClass"
  />
</template>
