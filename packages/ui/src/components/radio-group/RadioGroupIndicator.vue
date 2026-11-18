<script setup lang="ts">
import { RadioGroupIndicator } from "reka-ui";

import { cn } from "../../lib/cn";

defineOptions({ name: "RaftRadioGroupIndicator", inheritAttrs: false });
const attrs = useAttrs();
const indicatorClass = computed(() =>
  cn("pointer-events-none flex size-full items-center justify-center", attrs.class as string),
);
</script>

<template>
  <RadioGroupIndicator
    v-bind="{ ...attrs, class: undefined }"
    data-slot="radio-group-indicator"
    :class="indicatorClass"
  >
    <slot>
      <span data-slot="radio-group-dot" class="block size-2 rounded-full bg-current" />
    </slot>
  </RadioGroupIndicator>
</template>
