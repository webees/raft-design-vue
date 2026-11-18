<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverHeader", inheritAttrs: false });

const attrs = useAttrs();
const headerClass = computed(() => popover().header({ class: attrs.class as string | undefined }));
const headerAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="headerAttrs" data-slot="popover-header" :class="headerClass">
    <slot />
  </div>
</template>
