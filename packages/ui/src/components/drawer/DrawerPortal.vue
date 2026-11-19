<script setup lang="ts">
import { DrawerPortal } from "reka-ui";

defineOptions({ name: "RaftDrawerPortal", inheritAttrs: false });

withDefaults(
  defineProps<{
    to?: string | HTMLElement;
    disabled?: boolean;
    forceMount?: boolean;
  }>(),
  {
    to: "body",
    disabled: false,
  },
);
</script>

<template>
  <DrawerPortal
    v-bind="$attrs"
    :to="to"
    :disabled="disabled"
    :force-mount="forceMount"
    data-slot="drawer-portal"
    data-raft-ui-overlay=""
  >
    <slot />
  </DrawerPortal>
</template>
