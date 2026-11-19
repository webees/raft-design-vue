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
  <DrawerPortal :to="to" :disabled="disabled" :force-mount="forceMount">
    <div
      v-bind="$attrs"
      data-slot="drawer-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </DrawerPortal>
</template>
