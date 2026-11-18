<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { meter } from "./meter.variants";
import { meterContextKey } from "./meter-context";

defineOptions({ name: "RaftMeterIndicator", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();

const attrs = useAttrs();
const context = inject(meterContextKey, undefined);
const indicatorClass = computed(() => meter().indicator({ className: attrs.class as string }));
const indicatorStyle = computed(() => [
  { width: `${(context?.value.share ?? 0) * 100}%` },
  attrs.style,
]);
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    data-slot="meter-indicator"
    :style="indicatorStyle"
    :class="indicatorClass"
  />
</template>
