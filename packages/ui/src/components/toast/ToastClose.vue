<script setup lang="ts">
import { useAttrs } from "vue";
import { ToastClose } from "reka-ui";

import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastClose", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
</script>

<template>
  <ToastClose
    v-bind="attrs"
    :aria-label="'Dismiss toast'"
    data-slot="toast-close"
    :class="toastStyles().close({ class: props.class })"
  >
    <slot>Dismiss</slot>
  </ToastClose>
</template>
