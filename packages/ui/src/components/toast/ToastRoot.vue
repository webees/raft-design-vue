<script setup lang="ts">
import { ToastRoot, useToastManager } from "reka-ui";

import { usePresenceStyle } from "../../lib/presence-style";
import { toast as toastStyles } from "./toast.recipe";
import type { ToastIntent, ToastObject } from "./toast";
import {
  TOAST_ITEM_CONTEXT_KEY,
  TOAST_PROVIDER_CONFIG_KEY,
  getSwipeDirection,
  type ToastLayout,
} from "./toast-context";

defineOptions({ name: "RaftToastRoot", inheritAttrs: false });

const emit = defineEmits<{ "update:open": [open: boolean] }>();

const props = withDefaults(
  defineProps<{
    toast: ToastObject;
    layout?: ToastLayout;
    swipeDirection?: "up" | "down" | "left" | "right";
    class?: string;
    limited?: boolean;
  }>(),
  {
    layout: "stacked",
  },
);

const root = ref<Element | null>(null);
usePresenceStyle(() => props.toast.open, root);

const attrs = useAttrs();
const config = inject(TOAST_PROVIDER_CONFIG_KEY, null);
const manager = useToastManager();

const intent = computed<ToastIntent>(() => {
  const value = props.toast.data?.intent;
  return value === "success" || value === "warning" || value === "error" ? value : "info";
});

const placement = computed(() => config?.placement.value ?? "bottom-center");
const classes = computed(() => toastStyles({ layout: props.layout }).root({ class: props.class }));

provide(TOAST_ITEM_CONTEXT_KEY, {
  toast: computed(() => props.toast),
  intent,
});

watch(
  () => props.limited,
  (limited) => {
    if (limited && props.toast.open) manager.close(props.toast.id);
  },
  { immediate: true },
);
</script>

<template>
  <ToastRoot
    ref="root"
    v-bind="attrs"
    :toast="toast"
    :swipe-direction="swipeDirection ?? getSwipeDirection(placement)"
    data-slot="toast"
    :data-toast-type="intent"
    :class="classes"
    @update:open="(open: boolean) => emit('update:open', open)"
  >
    <slot />
  </ToastRoot>
</template>
