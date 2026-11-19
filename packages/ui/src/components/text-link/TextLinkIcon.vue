<script setup lang="ts">
import type { Component } from "vue";

import { cn } from "../../lib/cn";

defineOptions({ inheritAttrs: false });

const props = defineProps<{ icon: Component; dataSlot: string; label?: string }>();

const attrs = useAttrs();
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="props.dataSlot"
    :class="cn('ml-0.5 inline-flex align-[calc(0.7em/2-0.857em/2)]', attrs.class as string | undefined)"
  >
    <component
      :is="props.icon"
      aria-hidden="true"
      focusable="false"
      class="size-[0.857em]"
      :stroke-width="2"
    />
    <span v-if="props.label" class="sr-only"> {{ props.label }}</span>
  </span>
</template>
