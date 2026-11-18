<script setup lang="ts">
import { ContextMenuPortal } from "reka-ui";

defineOptions({ name: "RaftContextMenuPortal" });

withDefaults(
  defineProps<{
    disabled?: boolean;
    forceMount?: boolean;
  }>(),
  {
    disabled: undefined,
    forceMount: undefined,
  },
);
</script>

<template>
  <ContextMenuPortal
    data-slot="context-menu-portal"
    data-raft-ui-overlay=""
    :disabled="disabled"
    :force-mount="forceMount"
  >
    <slot />
  </ContextMenuPortal>
</template>
