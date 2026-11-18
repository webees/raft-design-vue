<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import { useComboboxSelection } from "./combobox-context";
defineOptions({ name: "RaftComboboxChip", inheritAttrs: false });
const props = withDefaults(defineProps<{ value?: string; className?: string }>(), {});
const attrs = useAttrs();
const { values } = useComboboxSelection();
const visible = computed(() => !props.value || values.value.includes(props.value));
const classes = computed(() => cn(combobox().chip(), props.className, attrs.class as string));
</script>

<template>
  <span v-if="visible" v-bind="{ ...attrs, class: undefined }" data-slot="combobox-chip" :data-value="value" :class="classes"><slot /></span>
</template>
