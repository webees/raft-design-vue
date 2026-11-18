<script setup lang="ts">
import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import { useComboboxSelection } from "./combobox-context";
const props = withDefaults(defineProps<{ className?: string }>(), {});
const { values } = useComboboxSelection();
</script>

<template>
  <span
    v-if="values.length"
    data-slot="combobox-trigger-count"
    :class="cn(combobox().triggerCount(), props.className)"
    >{{ values.length }}</span
  >
</template>
