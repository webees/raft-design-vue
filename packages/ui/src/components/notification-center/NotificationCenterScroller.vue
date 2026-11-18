<script setup lang="ts">
import { computed, useAttrs } from "vue";

import ScrollArea from "../scroll-area/ScrollArea.vue";
import { notificationCenter } from "./notification-center.recipe";

defineOptions({ name: "RaftNotificationCenterScroller", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => notificationCenter().scroller({ class: props.class }));
</script>

<template>
  <ScrollArea
    v-bind="attrs"
    overscroll="contain"
    data-slot="notification-center-scroller"
    :class="classes"
  >
    <slot />
  </ScrollArea>
</template>
