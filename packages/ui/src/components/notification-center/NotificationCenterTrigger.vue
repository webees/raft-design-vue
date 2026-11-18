<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { PopoverTrigger } from "reka-ui";
import { Bell } from "lucide-vue-next";

import Status from "../status/Status.vue";
import { notificationCenter } from "./notification-center.recipe";

defineOptions({ name: "RaftNotificationCenterTrigger", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const classes = computed(() => notificationCenter().trigger({ class: props.class }));
</script>

<template>
  <PopoverTrigger
    v-bind="attrs"
    data-slot="notification-center-trigger"
    :class="classes"
  >
    <slot>
      <span aria-hidden="true" :class="notificationCenter().triggerIcon()">
        <Bell :class="notificationCenter().triggerBell()" :stroke-width="2" />
      </span>
      <Status
        aria-hidden="true"
        variant="accent"
        size="md"
        :class="notificationCenter().triggerDot()"
      />
    </slot>
  </PopoverTrigger>
</template>
