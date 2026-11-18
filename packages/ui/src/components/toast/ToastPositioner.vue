<script setup lang="ts">
import { ToastPositioner } from "reka-ui";

import type { ToastObject } from "./toast";
import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastPositioner", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    toast: ToastObject;
    class?: string;
  }>(),
  {},
);

const attrs = useAttrs();
const classes = computed(() => toastStyles().positioner({ class: props.class }));
</script>

<template>
  <ToastPositioner v-bind="attrs" :toast="toast" data-slot="toast-positioner" :class="classes">
    <slot />
  </ToastPositioner>
</template>
