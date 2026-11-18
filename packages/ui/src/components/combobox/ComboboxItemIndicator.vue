<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxItemIndicator } from "reka-ui";
import { Check } from "lucide-vue-next";
import { combobox } from "./combobox.recipe";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxItemIndicator", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().itemIndicator(), props.className, attrs.class as string));
</script>

<template>
  <ComboboxItemIndicator v-bind="{ ...attrs, class: undefined }" data-slot="combobox-item-indicator" :class="classes">
    <slot><Check /></slot>
  </ComboboxItemIndicator>
</template>
