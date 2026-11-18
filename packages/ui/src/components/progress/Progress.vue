<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ProgressRoot } from "reka-ui";

import { progress, type ProgressSize, type ProgressVariant } from "./progress.recipe";
import { provideProgress } from "./progress-context";
import ProgressHeader from "./ProgressHeader.vue";
import ProgressIndicator from "./ProgressIndicator.vue";
import ProgressLabel from "./ProgressLabel.vue";
import ProgressTrack from "./ProgressTrack.vue";
import ProgressValue from "./ProgressValue.vue";

defineOptions({ name: "RaftProgress", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: number | null;
    max?: number;
    variant?: ProgressVariant;
    size?: ProgressSize;
  }>(),
  { modelValue: 0, max: 100, variant: "primary", size: "md" },
);
const attrs = useAttrs();

const indeterminate = computed(() => props.modelValue === null);
const ariaLabel = computed(() => attrs["aria-label"] as string | undefined);
const rootClass = computed(() =>
  progress({ size: props.size, variant: props.variant }).root({ className: attrs.class as string }),
);

provideProgress(indeterminate);
</script>

<template>
  <ProgressRoot
    v-bind="{ ...attrs, class: undefined }"
    :model-value="modelValue ?? undefined"
    :max="max"
    :aria-label="ariaLabel"
    data-slot="progress"
    :data-size="size"
    :data-variant="variant"
    :class="rootClass"
  >
    <slot>
      <slot name="header">
        <ProgressHeader v-if="$slots.label || $slots.value">
          <ProgressLabel v-if="$slots.label"><slot name="label" /></ProgressLabel>
          <ProgressValue v-if="$slots.value"><slot name="value" /></ProgressValue>
        </ProgressHeader>
      </slot>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </slot>
  </ProgressRoot>
</template>
