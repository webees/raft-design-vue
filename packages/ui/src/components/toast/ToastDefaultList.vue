<script setup lang="ts">
import { computed, inject } from "vue";

import { useToastManager, type ToastData, type ToastObject } from "./toast";
import { TOAST_PROVIDER_CONFIG_KEY } from "./toast-context";
import ToastDefaultItem from "./ToastDefaultItem.vue";

defineOptions({ name: "RaftToastDefaultList", inheritAttrs: false });

const manager = useToastManager<ToastData>();
const config = inject(TOAST_PROVIDER_CONFIG_KEY, null);
const limit = computed(() => config?.limit.value ?? 1);
const toasts = computed(() => manager.toasts.value as ToastObject<ToastData>[]);
</script>

<template>
  <ToastDefaultItem
    v-for="(toast, index) in toasts"
    :key="toast.id"
    :toast="toast"
    :limited="index >= limit"
  />
</template>
