<script setup lang="ts">
import Badge from "./Badge.vue";

defineOptions({ name: "RaftBadgeExperimental" });

const props = defineProps<{ as?: string; asChild?: boolean }>();
const label = computed(() => "Experimental");
</script>

<template>
  <Badge appearance="solid" variant="success" :as="props.as" :as-child="props.asChild">
    <slot>{{ label }}</slot>
  </Badge>
</template>
