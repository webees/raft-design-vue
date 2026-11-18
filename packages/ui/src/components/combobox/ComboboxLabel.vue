<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxLabel } from "reka-ui";
import { combobox } from "./combobox.recipe";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxLabel", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().label(), props.className, attrs.class as string));
</script>

<template>
  <ComboboxLabel v-bind="{ ...attrs, class: undefined }" data-slot="combobox-label" :class="classes"
    ><slot
  /></ComboboxLabel>
</template>
