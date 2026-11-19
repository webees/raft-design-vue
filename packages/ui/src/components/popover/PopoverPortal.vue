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
  <PopoverPortal :to="to" :disabled="disabled" :force-mount="forceMount">
    <div
      v-bind="$attrs"
      data-slot="popover-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </PopoverPortal>
</template>
