<script setup lang="ts">
import { HoverCardPortal } from "reka-ui";

defineOptions({ name: "RaftPreviewCardPortal", inheritAttrs: false });
</script>

<template>
  <HoverCardPortal>
    <div
      v-bind="$attrs"
      data-slot="preview-card-portal"
      data-raft-ui-overlay=""
      style="display: contents"
    >
      <slot />
    </div>
  </HoverCardPortal>
</template>
