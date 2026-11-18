<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { AlertTriangle, CheckCircle2, Info } from "lucide-vue-next";

import { notificationCenter } from "./notification-center.recipe";

defineOptions({ name: "RaftNotificationCenterItemIcon", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    status?: "error" | "warning" | "info" | "success";
    class?: string;
  }>(),
  { status: "info" },
);

const attrs = useAttrs();
const classes = computed(() =>
  notificationCenter({ status: props.status }).itemIcon({ class: props.class }),
);

const STATUS_LABEL = {
  error: "Error",
  warning: "Warning",
  info: "Info",
  success: "Success",
} as const;

const icon = computed(() =>
  props.status === "success" ? CheckCircle2 : props.status === "info" ? Info : AlertTriangle,
);
</script>

<template>
  <div
    v-bind="attrs"
    role="img"
    :aria-label="STATUS_LABEL[status]"
    data-slot="notification-center-item-icon"
    :data-status="status"
    :class="classes"
  >
    <slot>
      <component :is="icon" />
    </slot>
  </div>
</template>
