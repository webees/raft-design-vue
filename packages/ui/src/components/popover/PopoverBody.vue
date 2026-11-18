<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { popover } from "./popover.variants";

defineOptions({ name: "RaftPopoverBody", inheritAttrs: false });

const attrs = useAttrs();
const bodyClass = computed(() => popover().body({ class: attrs.class as string | undefined }));
const bodyAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div v-bind="bodyAttrs" data-slot="popover-body" :class="bodyClass">
    <slot />
  </div>
</template>
