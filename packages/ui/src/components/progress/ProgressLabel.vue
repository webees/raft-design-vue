<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { progress } from "./progress.recipe";

defineOptions({ name: "RaftProgressLabel", inheritAttrs: false });
const attrs = useAttrs();
const { label } = progress();
const labelClass = computed(() => label({ className: attrs.class as string }));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="progress-label" :class="labelClass">
    <slot />
  </span>
</template>
