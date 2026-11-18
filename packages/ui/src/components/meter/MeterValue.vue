<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { meter } from "./meter.variants";
import { meterContextKey } from "./meter-context";

defineOptions({ name: "RaftMeterValue", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();

const attrs = useAttrs();
const context = inject(meterContextKey, undefined);
const valueClass = computed(() =>
  meter().value({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="meter-value"
    :class="valueClass"
  >
    <slot>{{ context?.valueText }}</slot>
  </Primitive>
</template>
