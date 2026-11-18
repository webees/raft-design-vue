<script setup lang="ts">
import AppRailItemIndicator from "./AppRailItemIndicator.vue";

defineOptions({ name: "RaftAppRailItemAttention" });
defineProps<{ title?: string }>();
</script>

<template>
  <AppRailItemIndicator aria-hidden="true" />
  <span v-if="title" class="sr-only">{{ title }}</span>
</template>
