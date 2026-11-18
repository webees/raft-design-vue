<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { segmentedControlCount } from "./segmented-control.variants";

defineOptions({ name: "RaftSegmentedControlCount", inheritAttrs: false });
const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const countClass = computed(() => segmentedControlCount(props.class));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="segmented-control-count" :class="countClass">
    <slot />
  </span>
</template>
