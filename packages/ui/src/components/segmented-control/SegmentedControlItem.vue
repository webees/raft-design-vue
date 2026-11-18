<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { RadioGroupItem, TooltipProvider } from "reka-ui";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import SegmentedControlItemTrigger from "./SegmentedControlItemTrigger";
import { toElement } from "../../lib/dom";
import { useTapActivation } from "../../lib/tap-activation";
import {
  useSegmentedControlIconsOnly,
  useSegmentedControlToolbarStop,
} from "./segmented-control-context";
import { segmentedControlItem } from "./segmented-control.variants";

defineOptions({ name: "RaftSegmentedControlItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: string;
    disabled?: boolean;
    class?: string;
  }>(),
  { disabled: false },
);

const attrs = useAttrs();
const tapRef = useTapActivation();
const iconsOnly = useSegmentedControlIconsOnly();
const toolbarStop = useSegmentedControlToolbarStop();
const tooltipOpen = ref(false);
const tooltipText = ref("");
const itemEl = ref<HTMLElement | null>(null);
const setItemEl = (value: unknown) => {
  itemEl.value = toElement(value);
};

function onTooltipOpen(open: boolean) {
  if (!open) {
    tooltipOpen.value = false;
    return;
  }
  const text = itemEl.value?.querySelector("[data-slot=segmented-control-label]");
  // A visible label is never repeated in a tooltip; only collapsed labels are
  // named. Reka has no cancellable open event, so keep `open` controlled.
  if (!text || text.getBoundingClientRect().width > 1) {
    tooltipOpen.value = false;
    return;
  }
  tooltipText.value = text.textContent ?? "";
  tooltipOpen.value = true;
}

const itemClass = computed(() => segmentedControlItem(props.class));
</script>

<template>
  <TooltipProvider>
    <Tooltip :open="tooltipOpen" :disabled="!iconsOnly" @update:open="onTooltipOpen">
      <SegmentedControlItemTrigger
        :ref="
          (el: unknown) => {
            const node = toElement(el);
            tapRef(node);
            setItemEl(node);
          }
        "
      >
        <RadioGroupItem
          v-bind="{ ...attrs, class: undefined }"
          :value="value"
          :disabled="disabled"
          :tabindex="toolbarStop === false ? -1 : undefined"
          data-slot="segmented-control-item"
          :class="itemClass"
        >
          <slot />
        </RadioGroupItem>
      </SegmentedControlItemTrigger>
      <TooltipContent v-if="iconsOnly">{{ tooltipText }}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
