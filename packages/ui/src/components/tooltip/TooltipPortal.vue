<script setup lang="ts">
import { TooltipPortal } from "reka-ui";

defineOptions({ name: "RaftTooltipPortal", inheritAttrs: false });

withDefaults(
  defineProps<{
    to?: string | HTMLElement;
    disabled?: boolean;
    forceMount?: boolean;
  }>(),
  {
    to: undefined,
    disabled: false,
    forceMount: undefined,
  },
);
</script>

<template>
  <TooltipPortal
    v-bind="$attrs"
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
    data-slot="tooltip-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </TooltipPortal>
</template>
