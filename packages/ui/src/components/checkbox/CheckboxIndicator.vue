<script setup lang="ts">
import { Check, Minus } from "lucide-vue-next";
import { checkboxIndicator } from "./checkbox-indicator.variants";

defineOptions({ name: "RaftCheckboxIndicator", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    checked: boolean;
    mark?: "check" | "minus";
    shape?: "square" | "circle";
    disabled?: boolean;
    previewOnHover?: boolean;
  }>(),
  { mark: "check", shape: "square", disabled: false, previewOnHover: false },
);

const attrs = useAttrs();

const rootClass = computed(() =>
  checkboxIndicator({
    shape: props.shape,
    checked: props.checked,
    disabled: props.disabled,
    previewOnHover: props.previewOnHover,
  }).root({ className: attrs.class as string }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    :data-slot="(attrs['data-slot'] as string) ?? 'checkbox-indicator-graphic'"
    :class="rootClass"
  >
    <Minus v-if="mark === 'minus'" />
    <Check v-else-if="checked || previewOnHover" />
  </span>
</template>
