<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
defineOptions({ name: "RaftComboboxGroupLabel", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().groupLabel(), props.className, attrs.class as string));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="combobox-group-label" :class="classes">
    <slot />
  </div>
</template>
