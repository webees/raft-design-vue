<script setup lang="ts">
import { HoverCardRoot } from "reka-ui";

defineOptions({ name: "RaftPreviewCard", inheritAttrs: false });

withDefaults(defineProps<{ openDelay?: number; closeDelay?: number }>(), {
  openDelay: 80,
  closeDelay: 40,
});
</script>

<template>
  <HoverCardRoot v-bind="$attrs" :open-delay="openDelay" :close-delay="closeDelay">
    <slot />
  </HoverCardRoot>
</template>
