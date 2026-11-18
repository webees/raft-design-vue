<script setup lang="ts">
import { Checkbox } from "../checkbox";
import { messageMultiSelect } from "./message-multi-select.recipe";

const props = defineProps<{
  class?: string;
  modelValue?: boolean | "indeterminate";
  disabled?: boolean;
  ariaLabel?: string;
}>();
const emit = defineEmits<{ "update:modelValue": [value: boolean | "indeterminate"] }>();

const classes = computed(() => messageMultiSelect().checkbox({ className: props.class }));
</script>

<template>
  <Checkbox
    data-slot="message-multi-select-checkbox"
    :class="classes"
    :model-value="modelValue ?? false"
    :disabled="disabled"
    shape="square"
    :aria-label="ariaLabel"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
