<script setup lang="ts">
import { useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { Status } from "../status";
import { appRail } from "./app-rail.variants";

defineOptions({ name: "RaftAppRailItemIndicator", inheritAttrs: false });
const attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    size?: "xs" | "sm" | "md" | "lg";
    variant?: "default" | "primary" | "information" | "muted" | "accent" | "success" | "warning" | "danger";
    class?: string;
  }>(),
  { size: "sm", variant: "accent" },
);
</script>

<template>
  <Status
    aria-hidden="true"
    :size="size"
    :variant="variant"
    data-slot="app-rail-item-indicator"
    :class="cn(appRail().itemIndicator(), props.class, attrs.class as string | undefined)"
    v-bind="{ ...attrs, class: undefined }"
  />
</template>
