<script setup lang="ts">
import { useAttrs } from "vue";
import { ToastDescription } from "reka-ui";

import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastDescription", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
</script>

<template>
  <ToastDescription
    v-bind="attrs"
    data-slot="toast-description"
    :class="toastStyles().description({ class: props.class })"
  >
    <slot />
  </ToastDescription>
</template>
