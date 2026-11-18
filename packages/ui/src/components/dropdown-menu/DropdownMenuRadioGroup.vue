<script setup lang="ts">
import { DropdownMenuRadioGroup, type AcceptableValue } from "reka-ui";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuRadioGroup", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: undefined,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:model-value": [value: string];
}>();

const attrs = useAttrs();
const groupClass = computed(() =>
  dropdownMenu().radioGroup({ class: attrs.class as string | undefined }),
);

function onUpdate(value: AcceptableValue) {
  if (typeof value !== "string") return;
  emit("update:modelValue", value);
  emit("update:model-value", value);
}
</script>

<template>
  <DropdownMenuRadioGroup
    :model-value="props.modelValue"
    data-slot="dropdown-menu-radio-group"
    :class="groupClass"
    @update:model-value="onUpdate"
  >
    <slot />
  </DropdownMenuRadioGroup>
</template>
