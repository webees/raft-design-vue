<script setup lang="ts">
import { ToastArrow } from "reka-ui";

import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastArrow", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
</script>

<template>
  <ToastArrow
    v-bind="attrs"
    data-slot="toast-arrow"
    :class="toastStyles().arrow({ class: props.class })"
  >
    <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
      <path d="M1 0H11L6 5.25Z" class="fill-layer-hud" />
    </svg>
  </ToastArrow>
</template>
