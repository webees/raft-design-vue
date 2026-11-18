<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { meter } from "./meter.variants";

defineOptions({ name: "RaftMeterHeader", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();

const attrs = useAttrs();
const headerClass = computed(() =>
  meter().header({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as ?? 'div'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="meter-header"
    :class="headerClass"
  >
    <slot />
  </Primitive>
</template>
