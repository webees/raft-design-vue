<script setup lang="ts">
import { useAttrs } from "vue";

import { toast as toastStyles } from "./toast.recipe";

defineOptions({ name: "RaftToastBody", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
</script>

<template>
  <div v-bind="attrs" data-slot="toast-body" :class="toastStyles().body({ class: props.class })">
    <slot />
  </div>
</template>
