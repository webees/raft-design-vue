<script setup lang="ts">
import { ToastTitle } from "reka-ui";

import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastTitle", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
</script>

<template>
  <ToastTitle
    v-bind="attrs"
    data-slot="toast-title"
    :class="toastStyles().title({ class: props.class })"
  >
    <slot />
  </ToastTitle>
</template>
