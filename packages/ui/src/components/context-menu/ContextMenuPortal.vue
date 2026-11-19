<script setup lang="ts">
import { ContextMenuPortal } from "reka-ui";

defineOptions({ name: "RaftContextMenuPortal", inheritAttrs: false });

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
  <ContextMenuPortal :disabled="disabled" :force-mount="forceMount">
    <div
      v-bind="$attrs"
      data-slot="context-menu-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </ContextMenuPortal>
</template>
