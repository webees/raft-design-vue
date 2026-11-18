<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { RadioGroupRoot } from "reka-ui";

defineOptions({ name: "RaftRadioGroup", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
  }>(),
  { orientation: "vertical", disabled: false },
);
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
const attrs = useAttrs();
const rootClass = computed(() => [
  "grid w-full gap-2",
  "data-disabled:[&>label]:cursor-not-allowed data-disabled:[&>label]:text-foreground-disabled",
  "data-disabled:[&>label_*]:text-foreground-disabled",
  "font-sans [&>label]:font-semibold",
  props.orientation === "horizontal" ? "grid-flow-col auto-cols-max" : "",
  attrs.class as string,
]);
</script>

<template>
  <RadioGroupRoot
    v-bind="{ ...attrs, class: undefined }"
    :model-value="modelValue"
    :disabled="disabled"
    :orientation="orientation"
    data-slot="radio-group"
    :class="rootClass"
    @update:model-value="emit('update:modelValue', $event as string)"
  >
    <slot />
  </RadioGroupRoot>
</template>
