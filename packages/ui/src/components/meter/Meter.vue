<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { Primitive } from "reka-ui";
import { meter, type MeterSize } from "./meter.variants";
import { meterContextKey, type MeterContextValue } from "./meter-context";

defineOptions({ name: "RaftMeter", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    used: number;
    max?: number;
    warnAt?: number;
    valueText: string;
    size?: MeterSize;
    as?: string;
    asChild?: boolean;
  }>(),
  {
    max: 100,
    size: "md",
    as: "div",
    asChild: false,
  },
);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Number.isNaN(value) ? min : value));
}

const attrs = useAttrs();
const labelId = useId();
const value = computed(() => clamp(props.used, 0, props.max));
const share = computed(() => (props.max > 0 ? value.value / props.max : 1));
const warnFrom = computed(() =>
  props.warnAt !== undefined ? clamp(props.warnAt, 0, 1) : 0.8,
);
const level = computed<MeterContextValue["level"]>(() => {
  if (share.value >= 1) return "full";
  if (share.value >= warnFrom.value) return "high";
  return "normal";
});
const rootClass = computed(() =>
  meter({ size: props.size, warning: level.value !== "normal" }).root({
    className: attrs.class as string,
  }),
);

provide(
  meterContextKey,
  computed<MeterContextValue>(() => ({
    labelId,
    level: level.value,
    share: share.value,
    size: props.size,
    valueText: props.valueText,
  })),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="meter"
    :data-size="size"
    :data-level="level"
    role="meter"
    aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="value"
    :aria-valuetext="valueText"
    :aria-labelledby="attrs['aria-label'] ? undefined : labelId"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
