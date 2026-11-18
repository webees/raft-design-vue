<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { combobox } from "./combobox.recipe";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxTriggerIndicator", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().triggerIndicator(), props.className, attrs.class as string));
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="combobox-trigger-indicator"
    data-picker-trigger-indicator=""
    :class="classes"
  >
    <slot><ChevronDown /></slot>
  </span>
</template>
