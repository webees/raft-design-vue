<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ProgressIndicator } from "reka-ui";

import { progress } from "./progress.recipe";
import { useProgress } from "./progress-context";

defineOptions({ name: "RaftProgressIndicator", inheritAttrs: false });
const attrs = useAttrs();
const { indeterminate } = useProgress();
const { indicator } = progress();
const indicatorClass = computed(() => indicator({ className: attrs.class as string }));
</script>

<template>
  <ProgressIndicator
    v-bind="{ ...attrs, class: undefined }"
    data-slot="progress-indicator"
    :data-indeterminate="indeterminate ? '' : undefined"
    :class="indicatorClass"
  >
    <slot />
  </ProgressIndicator>
</template>
