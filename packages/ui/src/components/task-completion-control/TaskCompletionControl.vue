<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CheckboxIndicator } from "../checkbox";
import { taskCompletionControl } from "./task-completion-control.variants";

defineOptions({ name: "RaftTaskCompletionControl", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    checked: boolean;
    disabled?: boolean;
  }>(),
  { disabled: false },
);

const emit = defineEmits<{
  checkedChange: [checked: boolean, event: MouseEvent];
}>();

const attrs = useAttrs();
const preview = computed(() => !props.checked && !props.disabled);
const rootClass = computed(
  () =>
    taskCompletionControl({ preview: preview.value }).root({ className: attrs.class as string }),
);
const indicatorClass = computed(() => taskCompletionControl({ preview: preview.value }).indicator());

function onClick(event: MouseEvent) {
  event.stopPropagation();
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  (attrs.onClick as ((event: MouseEvent) => void) | undefined)?.(event);
  if (event.defaultPrevented) return;
  emit("checkedChange", !props.checked, event);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === " " || event.key === "Enter") event.stopPropagation();
  if (event.key === "Enter" || (props.disabled && event.key === " ")) event.preventDefault();
  (attrs.onKeydown as ((event: KeyboardEvent) => void) | undefined)?.(event);
}
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined, onClick: undefined, onKeydown: undefined }"
    type="button"
    role="checkbox"
    :aria-checked="checked"
    :aria-disabled="disabled || undefined"
    data-slot="task-completion-control"
    :data-checked="checked ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :class="rootClass"
    @click="onClick"
    @keydown="onKeyDown"
  >
    <CheckboxIndicator
      shape="circle"
      :checked="checked"
      :disabled="disabled"
      :preview-on-hover="preview"
      :class="indicatorClass"
    />
  </button>
</template>
