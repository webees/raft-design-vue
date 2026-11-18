<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { progress } from "./progress.recipe";

defineOptions({ name: "RaftProgressValue", inheritAttrs: false });
const attrs = useAttrs();
const { value } = progress();
const valueClass = computed(() => value({ className: attrs.class as string }));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="progress-value" :class="valueClass">
    <slot />
  </span>
</template>
