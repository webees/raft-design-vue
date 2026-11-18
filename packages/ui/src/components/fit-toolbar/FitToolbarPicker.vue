<script setup lang="ts">
import type { VNode } from "vue";
import { ChevronDown } from "lucide-vue-next";

import { cn } from "../../lib/cn";
import PickerTriggerButton from "../picker-trigger-button/PickerTriggerButton.vue";
import Tooltip from "../tooltip/Tooltip.vue";
import TooltipContent from "../tooltip/TooltipContent.vue";
import TooltipTrigger from "../tooltip/TooltipTrigger.vue";
import { fitToolbar } from "./fit-toolbar.recipe";
import { useFitItem } from "./use-fit-item";

defineOptions({ name: "RaftFitToolbarPicker", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Its label ("Assignee"): part of its accessible name and, once it has given way, its tooltip. */
    label?: string;
    /** What is chosen: the value ("In progress"). */
    value?: string;
    /**
     * Its accessible name, when the page gives a shorter one than the label
     * and value together.
     */
    name?: string;
    /** When its label gives way (the `label` step). */
    labelOrder?: number;
    /** When it moves into More (the `more` step). */
    moreOrder?: number;
    /** What it is in More's menu. */
    moreItem?: VNode;
    hasValue?: boolean;
    disabled?: boolean;
  }>(),
  {},
);

const attrs = useAttrs();
const slots = useSlots();
const isCount = (value: unknown) =>
  typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value));
const styles = computed(() => fitToolbar({ count: isCount(props.value) }));
const item = useFitItem({
  label: props.labelOrder,
  more: props.moreOrder,
  moreItem: props.moreItem,
});

const hasValue = computed(
  () => props.hasValue ?? (props.value !== undefined && props.value !== null && props.value !== ""),
);
const fullName = computed(() => {
  if (props.name !== undefined && props.name !== "") return props.name;
  return [props.label, hasValue.value ? props.value : undefined].filter(Boolean).join(" ");
});
const labelTaken = computed(() => item.taken("label"));
const moreTaken = computed(() => item.taken("more"));
const rootClass = computed(() => cn(styles.value.picker(), attrs.class as string | undefined));
</script>

<template>
  <Tooltip :disabled="!labelTaken">
    <TooltipTrigger as-child>
      <PickerTriggerButton
        v-bind="{ ...attrs, class: undefined }"
        :has-value="hasValue"
        :disabled="disabled"
        :aria-label="fullName"
        data-slot="fit-toolbar-picker"
        data-fit-needs-icon=""
        :data-fit-id="item.props.value['data-fit-id']"
        :data-fit-steps="item.props.value['data-fit-steps']"
        :data-fit-label="labelTaken ? '' : undefined"
        :data-fit-more="moreTaken ? '' : undefined"
        :class="rootClass"
      >
        <span v-if="slots.icon" data-slot="fit-toolbar-picker-icon" :class="styles.icon()">
          <slot name="icon" />
        </span>
        <span data-slot="fit-toolbar-picker-label" :class="styles.label()">
          <slot>{{ label }}</slot>
        </span>
        <span v-if="hasValue" data-slot="fit-toolbar-picker-value" :class="styles.pickerValue()">
          {{ value }}
        </span>
        <span
          data-slot="fit-toolbar-picker-chevron"
          data-picker-trigger-indicator=""
          aria-hidden
          :class="styles.chevron()"
        >
          <ChevronDown />
        </span>
      </PickerTriggerButton>
    </TooltipTrigger>
    <TooltipContent>{{ label }}</TooltipContent>
  </Tooltip>
</template>
