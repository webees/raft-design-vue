<script setup lang="ts">
import { computed, useAttrs } from "vue";

import Badge from "../badge/Badge.vue";
import { messageActionCard } from "./message-action-card.recipes";

defineOptions({ name: "RaftMessageActionCardStatus", inheritAttrs: false });

const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    variant?:
      "default" | "muted" | "primary" | "information" | "accent" | "success" | "warning" | "danger";
    appearance?: "solid" | "soft" | "outline";
  }>(),
  { variant: "default", appearance: "soft" },
);

const tones = {
  default: "neutral",
  muted: "neutral",
  primary: "primary",
  information: "information",
  accent: "accent",
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

const rootClass = computed(() => {
  const styles = messageActionCard({ tone: tones[props.variant] });
  return styles.headerStatus({ className: styles.status({ className: attrs.class as string }) });
});
</script>

<template>
  <Badge
    v-bind="{ ...attrs, class: undefined }"
    :variant="variant"
    :appearance="appearance"
    data-slot="message-action-card-status"
    :class="rootClass"
  >
    <slot />
  </Badge>
</template>
