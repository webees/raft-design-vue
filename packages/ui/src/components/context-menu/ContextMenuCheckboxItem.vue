<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ContextMenuCheckboxItem } from "reka-ui";

import { cn } from "../../lib/cn";
import { contextMenu } from "./context-menu.variants";

defineOptions({ name: "RaftContextMenuCheckboxItem", inheritAttrs: false });

withDefaults(
  defineProps<{ modelValue?: boolean | "indeterminate"; disabled?: boolean; textValue?: string }>(),
  {
    modelValue: false,
    disabled: false,
    textValue: undefined,
  },
);

const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();
const attrs = useAttrs();
const rootClass = computed(() =>
  contextMenu().item({ class: cn("justify-between", attrs.class as string) }),
);
</script>

<template>
  <ContextMenuCheckboxItem
    v-bind="{ ...attrs, class: undefined }"
    :model-value="modelValue"
    :disabled="disabled"
    :text-value="textValue"
    data-slot="context-menu-checkbox-item"
    :class="rootClass"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </ContextMenuCheckboxItem>
</template>
