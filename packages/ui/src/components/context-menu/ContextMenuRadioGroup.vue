<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ContextMenuRadioGroup, type AcceptableValue } from "reka-ui";

import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuRadioGroup", inheritAttrs: false });

const props = withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: undefined });
const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:model-value": [value: string];
}>();

const attrs = useAttrs();
const groupClass = computed(() =>
  contextMenu().radioGroup({ className: attrs.class as string | undefined }),
);

function onUpdate(value: AcceptableValue) {
  if (typeof value !== "string") return;
  emit("update:modelValue", value);
  emit("update:model-value", value);
}
</script>

<template>
  <ContextMenuRadioGroup
    :model-value="props.modelValue"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="context-menu-radio-group"
    :class="groupClass"
    @update:model-value="onUpdate"
  >
    <slot />
  </ContextMenuRadioGroup>
</template>
