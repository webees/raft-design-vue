<script setup lang="ts">
import { TooltipProvider } from "reka-ui";

defineOptions({ name: "RaftTooltipProvider", inheritAttrs: false });

withDefaults(
  defineProps<{
    delayDuration?: number;
    skipDelayDuration?: number;
    disableHoverableContent?: boolean;
  }>(),
  {
    delayDuration: 0,
    skipDelayDuration: 300,
    disableHoverableContent: undefined,
  },
);
</script>

<template>
  <TooltipProvider
    v-bind="$attrs"
    :delay-duration="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :disable-hoverable-content="disableHoverableContent"
  >
    <slot />
  </TooltipProvider>
</template>
