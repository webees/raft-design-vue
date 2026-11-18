<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { notificationCenter } from "./notification-center.recipe";

defineOptions({ name: "RaftNotificationCenterItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    read?: boolean;
    class?: string;
  }>(),
  { read: false },
);

const attrs = useAttrs();
const classes = computed(() =>
  notificationCenter({ read: props.read }).item({ class: props.class }),
);
</script>

<template>
  <li
    v-bind="attrs"
    data-slot="notification-center-item"
    :data-read="read ? '' : undefined"
    :class="classes"
  >
    <slot />
  </li>
</template>
