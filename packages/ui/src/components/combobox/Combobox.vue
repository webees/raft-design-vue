<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { ComboboxRoot } from "reka-ui";

import { cn } from "../../lib/cn";
import { provideCombobox } from "./combobox-context";

defineOptions({ name: "RaftCombobox", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string | readonly string[] | null;
    defaultValue?: string | readonly string[] | null;
    open?: boolean;
    defaultOpen?: boolean;
    multiple?: boolean;
    disabled?: boolean;
    className?: string;
  }>(),
  {
    modelValue: undefined,
    defaultValue: null,
    open: undefined,
    defaultOpen: false,
    multiple: false,
    disabled: false,
  },
);

const attrs = useAttrs();
const emit = defineEmits<{
  "update:modelValue": [value: string | string[] | null];
  "update:model-value": [value: string | string[] | null];
  "update:open": [open: boolean];
  "value-change": [value: string | string[] | null];
}>();

const looseValue = ref<string | readonly string[] | null>(props.defaultValue ?? null);
const looseOpen = ref(props.defaultOpen ?? false);
function mutableValue(
  input: string | readonly string[] | null | undefined,
): string | string[] | null {
  if (input == null) return null;
  return typeof input === "string" ? input : [...input];
}

const value = computed<string | string[] | null>(() =>
  mutableValue(props.modelValue !== undefined ? props.modelValue : looseValue.value),
);
const open = computed(() => (props.open !== undefined ? props.open : looseOpen.value));

function updateValue(next: unknown) {
  const normalised =
    next == null ? null : Array.isArray(next) ? ([...next] as string[]) : String(next);
  if (props.modelValue === undefined) looseValue.value = normalised;
  emit("update:modelValue", normalised);
  emit("update:model-value", normalised);
  emit("value-change", normalised);
}

function updateOpen(next: boolean) {
  if (props.open === undefined) looseOpen.value = next;
  emit("update:open", next);
}

provideCombobox({
  value,
  setValue: (next) => updateValue(next),
  clear: () => updateValue(props.multiple ? [] : null),
  open,
  setOpen: updateOpen,
  multiple: computed(() => props.multiple),
});
</script>

<template>
  <ComboboxRoot
    v-bind="{ ...attrs, class: undefined }"
    data-slot="combobox"
    :model-value="value"
    :open="open"
    :multiple="multiple"
    :disabled="disabled"
    :class="cn('min-w-0', className, attrs.class as string)"
    @update:model-value="updateValue"
    @update:open="updateOpen"
  >
    <slot />
  </ComboboxRoot>
</template>
