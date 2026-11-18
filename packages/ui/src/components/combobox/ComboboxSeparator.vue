<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxSeparator } from "reka-ui";
import { combobox } from "./combobox.recipe";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxSeparator", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().separator(), props.className, attrs.class as string));
</script>

<template>
  <ComboboxSeparator v-bind="{ ...attrs, class: undefined }" data-slot="combobox-separator" :class="classes" />
</template>
