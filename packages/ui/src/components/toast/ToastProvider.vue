<script setup lang="ts">
import { ToastProvider } from "reka-ui";
import type { GlobalToastManager } from "reka-ui";

import {
  DEFAULT_TOAST_ACTION_TIMEOUT_MS,
  DEFAULT_TOAST_TIMEOUT_MS,
  defaultToastManager,
  resolveToastActionTimeout,
  setDefaultToastActionTimeout,
} from "./toast";
import {
  TOAST_PROVIDER_CONFIG_KEY,
  type ToastPlacement,
  type ToastStrategy,
} from "./toast-context";
import { ToastPortal } from "./ToastPortal";
import ToastViewport from "./ToastViewport.vue";
import ToastDefaultList from "./ToastDefaultList.vue";

defineOptions({ name: "RaftToastProvider", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    label?: string;
    duration?: number;
    disableSwipe?: boolean;
    swipeDirection?: "up" | "down" | "left" | "right";
    swipeThreshold?: number;
    limit?: number;
    toastManager?: GlobalToastManager;
    timeout?: number;
    actionTimeout?: number;
    portalContainer?: HTMLElement | string;
    renderViewport?: boolean;
    viewportClassName?: string;
    viewportPlacement?: ToastPlacement;
    viewportStrategy?: ToastStrategy;
    class?: string;
  }>(),
  {
    limit: 1,
    timeout: DEFAULT_TOAST_TIMEOUT_MS,
    renderViewport: true,
    viewportPlacement: "bottom-center",
    viewportStrategy: "fixed",
  },
);

const manager = computed(() => props.toastManager ?? defaultToastManager);
const resolvedActionTimeout = computed(() =>
  resolveToastActionTimeout(props.timeout ?? DEFAULT_TOAST_TIMEOUT_MS, props.actionTimeout),
);

provide(TOAST_PROVIDER_CONFIG_KEY, {
  timeout: computed(() => props.timeout ?? DEFAULT_TOAST_TIMEOUT_MS),
  placement: computed(() => props.viewportPlacement ?? "bottom-center"),
  strategy: computed(() => props.viewportStrategy ?? "fixed"),
  limit: computed(() => props.limit ?? 1),
});

function syncDefaultTiming() {
  if (manager.value !== defaultToastManager) return;
  setDefaultToastActionTimeout(resolvedActionTimeout.value);
}

syncDefaultTiming();
watch(resolvedActionTimeout, syncDefaultTiming);
watch(manager, syncDefaultTiming);

onBeforeUnmount(() => {
  if (manager.value !== defaultToastManager) return;
  setDefaultToastActionTimeout(DEFAULT_TOAST_ACTION_TIMEOUT_MS);
});
</script>

<template>
  <ToastProvider
    :label="label"
    :duration="duration"
    :disable-swipe="disableSwipe"
    :swipe-direction="swipeDirection"
    :swipe-threshold="swipeThreshold"
    :limit="limit"
    :toast-manager="manager"
  >
    <slot />
    <ToastPortal v-if="renderViewport" :to="portalContainer">
      <ToastViewport
        :placement="viewportPlacement"
        :strategy="viewportStrategy"
        :class="viewportClassName"
      >
        <ToastDefaultList />
      </ToastViewport>
    </ToastPortal>
  </ToastProvider>
</template>
