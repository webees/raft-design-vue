<script setup lang="ts">
import { useAttrs } from "vue";
import EmptyState from "../empty-state/EmptyState.vue";

defineOptions({ name: "RaftNotificationCenterEmptyState", inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <EmptyState v-bind="attrs" data-slot="notification-center-empty-state">
    <slot />
  </EmptyState>
</template>
