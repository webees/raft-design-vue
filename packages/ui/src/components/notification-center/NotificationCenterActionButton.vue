<script setup lang="ts">
import { computed, useAttrs } from "vue";

import Button from "../button/Button.vue";
import { notificationCenter } from "./notification-center.recipe";

defineOptions({ name: "RaftNotificationCenterActionButton", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => notificationCenter().actionButton({ class: props.class }));
</script>

<template>
  <Button
    v-bind="attrs"
    type="button"
    size="md"
    variant="outline"
    data-slot="notification-center-action-button"
    :class="classes"
  >
    <slot />
  </Button>
</template>
