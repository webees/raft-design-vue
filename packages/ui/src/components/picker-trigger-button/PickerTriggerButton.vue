<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { pickerTriggerButton } from "./picker-trigger-button.variants";

defineOptions({ name: "RaftPickerTriggerButton", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    hasValue?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    class?: string;
  }>(),
  {
    hasValue: false,
    invalid: false,
    disabled: false,
    type: "button",
  },
);

const attrs = useAttrs();
const triggerClass = computed(() =>
  cn(pickerTriggerButton(), props.class, attrs.class as string),
);
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    :type="type"
    :disabled="disabled"
    :data-slot="(attrs['data-slot'] as string) ?? 'picker-trigger-button'"
    :data-has-value="hasValue ? '' : undefined"
    :data-invalid="invalid ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :class="triggerClass"
  >
    <slot />
  </button>
</template>
