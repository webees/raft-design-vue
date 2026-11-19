<script setup lang="ts">
import { ToastPortal } from "reka-ui";

defineOptions({ name: "RaftToastPortal", inheritAttrs: false });

withDefaults(
  defineProps<{
    to?: string | HTMLElement;
    disabled?: boolean;
    forceMount?: boolean;
  }>(),
  {
    to: "body",
  },
);
</script>

<template>
  <ToastPortal :to="to" :disabled="disabled" :force-mount="forceMount">
    <div
      v-bind="$attrs"
      data-slot="toast-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </ToastPortal>
</template>
