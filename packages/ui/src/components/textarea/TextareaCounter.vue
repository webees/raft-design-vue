<script setup lang="ts">
import { textareaCounter } from "./textarea.variants";

defineOptions({ name: "RaftTextareaCounter", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    value?: string;
    count?: number;
    limit: number;
    getLength?: (value: string) => number;
  }>(),
  { value: "" },
);
const attrs = useAttrs();
const length = computed(
  () => props.count ?? props.getLength?.(props.value ?? "") ?? (props.value ?? "").length,
);
const overLimit = computed(() => length.value > props.limit);
const rootClass = computed(() =>
  textareaCounter({ overLimit: overLimit.value }).root({ className: attrs.class as string }),
);
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="textarea-counter" :class="rootClass">
    <slot>{{ length }}/{{ limit }}</slot>
  </span>
</template>
