<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { Checkbox } from "../checkbox";
import { markdown } from "./markdown.variants";

defineOptions({ name: "RaftMarkdownCheckbox", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    checked?: boolean | "indeterminate";
    defaultChecked?: boolean;
    disabled?: boolean;
  }>(),
  { checked: undefined, defaultChecked: false, disabled: false },
);

const attrs = useAttrs();
const initial = ref(props.checked ?? props.defaultChecked);
const model = computed<boolean | "indeterminate">(() => props.checked ?? initial.value);
const checkboxClass = computed(() => markdown().checkbox({ className: attrs.class as string }));
</script>

<template>
  <Checkbox
    v-bind="{ ...attrs, class: undefined }"
    :model-value="model"
    :disabled="disabled"
    :class="checkboxClass"
  />
</template>
