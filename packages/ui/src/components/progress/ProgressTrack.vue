<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { progress } from "./progress.recipe";

defineOptions({ name: "RaftProgressTrack", inheritAttrs: false });

const attrs = useAttrs();
const { track } = progress();
const trackClass = computed(() => track({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" :class="trackClass" data-slot="progress-track">
    <slot />
  </div>
</template>
