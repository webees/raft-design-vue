<script setup lang="ts">
import { ComboboxEmpty } from "reka-ui";
import { combobox } from "./combobox.recipe";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxEmpty", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().empty(), props.className, attrs.class as string));
</script>

<template>
  <ComboboxEmpty v-bind="{ ...attrs, class: undefined }" data-slot="combobox-empty">
    <div v-if="$slots.default" data-slot="combobox-empty-content" :class="classes"><slot /></div>
  </ComboboxEmpty>
</template>
