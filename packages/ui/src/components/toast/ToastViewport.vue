<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { ToastViewport } from "reka-ui";

import { toast as toastStyles } from "./toast.recipe";
import {
  TOAST_PROVIDER_CONFIG_KEY,
  type ToastPlacement,
  type ToastStrategy,
} from "./toast-context";

defineOptions({ name: "RaftToastViewport", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    placement?: ToastPlacement;
    strategy?: ToastStrategy;
    class?: string;
  }>(),
  {},
);

const attrs = useAttrs();
const config = inject(TOAST_PROVIDER_CONFIG_KEY, null);
const placement = computed(
  () => props.placement ?? config?.placement.value ?? "bottom-center",
);
const strategy = computed(
  () => props.strategy ?? config?.strategy.value ?? "fixed",
);
const classes = computed(() =>
  toastStyles({ placement: placement.value, strategy: strategy.value }).viewport({
    class: props.class,
  }),
);
</script>

<template>
  <ToastViewport
    v-bind="attrs"
    data-slot="toast-viewport"
    :data-toast-placement="placement"
    :data-toast-strategy="strategy"
    :class="classes"
  >
    <slot />
  </ToastViewport>
</template>
