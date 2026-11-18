<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch } from "vue";
import { RadioGroupRoot } from "reka-ui";
import { toElement } from "../../lib/dom";
import { useInFitToolbar } from "../fit-toolbar/fit-toolbar-context";
import {
  segmentedControlRoot,
  type SegmentedControlIconsOnlyPreset,
  type SegmentedControlVariant,
} from "./segmented-control.variants";
import { isIconsOnlyPreset, useTrackFit } from "./use-track-fit";
import {
  provideSegmentedControlIconsOnly,
  provideSegmentedControlToolbarStop,
} from "./segmented-control-context";

defineOptions({ name: "RaftSegmentedControl", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    variant?: SegmentedControlVariant;
    iconsOnlyBelow?: SegmentedControlIconsOnlyPreset | "auto" | string;
    class?: string;
  }>(),
  { variant: "default", disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const attrs = useAttrs();
const inFitToolbar = useInFitToolbar();
const toolbarStop = computed(() => (inFitToolbar ? true : undefined));
provideSegmentedControlIconsOnly(
  computed(() => inFitToolbar || props.iconsOnlyBelow !== undefined),
);
provideSegmentedControlToolbarStop(toolbarStop);
const track = ref<HTMLElement | null>(null);
const setTrack = (element: unknown) => {
  track.value = toElement(element);
};
const overflowing = ref(false);
const preset = computed(() =>
  !inFitToolbar && isIconsOnlyPreset(props.iconsOnlyBelow)
    ? (props.iconsOnlyBelow as SegmentedControlIconsOnlyPreset)
    : undefined,
);

useTrackFit(
  track,
  computed(() => (inFitToolbar ? undefined : props.iconsOnlyBelow)),
  overflowing,
);

watch(
  () => [overflowing.value, props.modelValue] as const,
  async () => {
    if (!overflowing.value) return;
    await nextTick();
    const element = track.value;
    const checked = element?.querySelector<HTMLElement>("[data-state=checked]");
    if (!element || !checked) return;
    const start = checked.offsetLeft;
    const end = start + checked.offsetWidth;
    if (start < element.scrollLeft) element.scrollLeft = start;
    else if (end > element.scrollLeft + element.clientWidth) {
      element.scrollLeft = end - element.clientWidth;
    }
  },
);

const rootClass = computed(() =>
  segmentedControlRoot({
    variant: props.variant,
    preset: preset.value,
    measured: !inFitToolbar && props.iconsOnlyBelow !== undefined && preset.value === undefined,
    inFitToolbar,
    class: props.class,
  }),
);
</script>

<template>
  <RadioGroupRoot
    v-bind="{ ...attrs, class: undefined }"
    :ref="setTrack"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :name="name"
    :required="required"
    orientation="horizontal"
    data-slot="segmented-control"
    :data-fit-needs-icon="inFitToolbar ? '' : undefined"
    :data-overflowing="overflowing ? '' : undefined"
    :class="rootClass"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <slot />
  </RadioGroupRoot>
</template>
