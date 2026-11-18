<script setup lang="ts">
import { toRef } from "vue";
import { SelectRoot } from "reka-ui";
import {
  provideSelectChrome,
  provideSelectFit,
  provideSelectItems,
  type SelectItems,
} from "./select-context";
import { SelectAction } from "./select-action";
import type { SelectChrome } from "./select.variants";

defineOptions({ name: "RaftSelect", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | bigint | Record<string, unknown> | null;
    defaultValue?: string | number | bigint | Record<string, unknown> | null;
    open?: boolean;
    defaultOpen?: boolean;
    disabled?: boolean;
    name?: string;
    required?: boolean;
    dir?: "ltr" | "rtl";
    chrome?: SelectChrome;
    fit?: boolean;
    items?: SelectItems;
  }>(),
  {
    modelValue: undefined,
    defaultValue: undefined,
    open: undefined,
    defaultOpen: false,
    disabled: false,
    required: false,
    chrome: "default",
    fit: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: unknown];
  "update:open": [open: boolean];
}>();

provideSelectChrome(toRef(props, "chrome"));
provideSelectFit(toRef(props, "fit"));
provideSelectItems(toRef(props, "items"));

function onModel(value: unknown) {
  if (value instanceof SelectAction) {
    value.run();
    if (value.close) emit("update:open", false);
    return;
  }
  emit("update:modelValue", value);
}
</script>

<template>
  <SelectRoot
    :model-value="modelValue"
    :default-value="defaultValue"
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :name="name"
    :required="required"
    :dir="dir"
    data-slot="select"
    :data-chrome="chrome"
    v-bind="$attrs"
    @update:model-value="onModel"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </SelectRoot>
</template>
