<script setup lang="ts">
import { segmentedControlLabel } from "./segmented-control.variants";

defineOptions({ name: "RaftSegmentedControlLabel", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const labelClass = computed(() => segmentedControlLabel(props.class));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="segmented-control-label"
    :class="labelClass"
  >
    <slot />
  </span>
</template>
