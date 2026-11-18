<script setup lang="ts">
import { DialogPortal } from "reka-ui";

defineOptions({ name: "RaftLightboxPortal", inheritAttrs: false });

withDefaults(
  defineProps<{
    disabled?: boolean;
    forceMount?: boolean;
    to?: string | HTMLElement;
  }>(),
  {
    to: "body",
  },
);
</script>

<template>
  <DialogPortal :to="to" :disabled="disabled" :force-mount="forceMount">
    <div data-slot="lightbox-portal" data-raft-ui-overlay="" style="display: contents">
      <slot />
    </div>
  </DialogPortal>
</template>
