<script setup lang="ts">
import { computed, inject, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { meter } from "./meter.variants";
import { meterContextKey } from "./meter-context";

defineOptions({ name: "RaftMeterLabel", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();

const attrs = useAttrs();
const context = inject(meterContextKey, undefined);
const labelClass = computed(() => meter().label({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="meter-label"
    :id="attrs.id ?? context?.labelId"
    :class="labelClass"
  >
    <slot />
  </Primitive>
</template>
