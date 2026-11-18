<script setup lang="ts">
import { DropdownMenuCheckboxItem } from "reka-ui";
import DropdownMenuItemIndicator from "./DropdownMenuItemIndicator.vue";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuCheckboxItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | "indeterminate";
    disabled?: boolean;
    textValue?: string;
  }>(),
  {
    modelValue: false,
    disabled: false,
    textValue: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean | "indeterminate"];
  "update:model-value": [value: boolean | "indeterminate"];
}>();

const attrs = useAttrs();
const itemClass = computed(() =>
  dropdownMenu().checkboxItem({ class: attrs.class as string | undefined }),
);
const itemAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});

function onUpdate(value: boolean | "indeterminate") {
  emit("update:modelValue", value);
  emit("update:model-value", value);
}
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="itemAttrs"
    :model-value="props.modelValue"
    :disabled="props.disabled"
    :text-value="props.textValue"
    data-slot="dropdown-menu-checkbox-item"
    :class="itemClass"
    @update:model-value="onUpdate"
  >
    <slot name="indicator">
      <DropdownMenuItemIndicator />
    </slot>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
