<script setup lang="ts">
import { HoverCardPortal } from "reka-ui";

defineOptions({ name: "RaftPreviewCardPortal", inheritAttrs: false });
</script>

<template>
  <HoverCardPortal v-bind="$attrs" data-slot="preview-card-portal" data-raft-ui-overlay="">
    <slot />
  </HoverCardPortal>
</template>
