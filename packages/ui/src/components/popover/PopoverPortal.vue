<script setup lang="ts">
import { PopoverPortal } from "reka-ui";

defineOptions({ name: "RaftPopoverPortal", inheritAttrs: false });

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
  <PopoverPortal
    v-bind="$attrs"
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
    data-slot="popover-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </PopoverPortal>
</template>
