<script setup lang="ts">
import { DropdownMenuPortal } from "reka-ui";

defineOptions({ name: "RaftDropdownMenuPortal", inheritAttrs: false });

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
  <DropdownMenuPortal
    v-bind="$attrs"
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
    data-slot="dropdown-menu-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </DropdownMenuPortal>
</template>
