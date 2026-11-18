<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import { useComboboxSelection } from "./combobox-context";
defineOptions({ name: "RaftComboboxChips", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const { values } = useComboboxSelection();
const classes = computed(() => cn(combobox().chips(), props.className, attrs.class as string));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="combobox-chips" :class="classes">
    <slot :values="values" />
  </div>
</template>
