<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxItem } from "reka-ui";
import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
defineOptions({ name: "RaftComboboxItem", inheritAttrs: false });
const props = withDefaults(
  defineProps<{ value: string; disabled?: boolean; textValue?: string; className?: string }>(),
  { disabled: false },
);
const attrs = useAttrs();
const classes = computed(() => cn(combobox().item(), props.className, attrs.class as string));
</script>

<template>
  <ComboboxItem
    v-bind="{ ...attrs, class: undefined }"
    data-slot="combobox-item"
    :value="value"
    :disabled="disabled"
    :text-value="textValue"
    :class="classes"
  >
    <slot />
  </ComboboxItem>
</template>
