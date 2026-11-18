<script setup lang="ts">
import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastProgress", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    duration?: number;
    class?: string;
  }>(),
  {
    duration: 5000,
  },
);

const attrs = useAttrs();
const classes = computed(() => toastStyles().progress({ class: props.class }));
</script>

<template>
  <div
    v-bind="attrs"
    aria-hidden="true"
    data-slot="toast-progress"
    :style="{ '--toast-progress-duration': `${duration}ms` }"
    :class="classes"
  />
</template>
