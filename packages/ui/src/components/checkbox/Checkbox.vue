<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CheckboxIndicator as BaseCheckboxIndicator, CheckboxRoot } from "reka-ui";

import CheckboxIndicator from "./CheckboxIndicator.vue";

defineOptions({ name: "RaftCheckbox", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: boolean | "indeterminate";
    shape?: "square" | "circle";
    disabled?: boolean;
  }>(),
  { modelValue: false, shape: "square", disabled: false },
);

const emit = defineEmits<{ "update:modelValue": [value: boolean | "indeterminate"] }>();
const attrs = useAttrs();

const rootClass = computed(() => [
  "relative inline-flex size-5 shrink-0 touch-manipulation items-center justify-center outline-none",
  "rounded-sticker focus-visible:shadow-focus",
  "data-disabled:cursor-not-allowed",
  "after:absolute after:-inset-x-3 after:-inset-y-2 after:content-[''] pointer-coarse:after:-inset-y-3",
  "[label>&]:my-[max(0px,calc((1lh-1.25rem)/2))]",
  "[label>&]:after:-inset-y-[calc(max(0px,(1lh-1.25rem)/2)+4px)]",
  attrs.class as string,
]);

const indeterminate = computed(() => props.modelValue === "indeterminate");
const checked = computed(() => props.modelValue === true || indeterminate.value);
</script>

<template>
  <CheckboxRoot
    v-bind="{ ...attrs, class: undefined }"
    :model-value="modelValue"
    :disabled="disabled"
    :data-slot="(attrs['data-slot'] as string) ?? 'checkbox'"
    :class="rootClass"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <BaseCheckboxIndicator as-child force-mount>
      <CheckboxIndicator
        class="pointer-events-none"
        :checked="checked"
        :mark="indeterminate ? 'minus' : 'check'"
        :shape="shape"
        :disabled="disabled"
      />
    </BaseCheckboxIndicator>
  </CheckboxRoot>
</template>
