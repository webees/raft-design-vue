<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../../lib/cn";
import { useComboboxSelection } from "./combobox-context";
defineOptions({ name: "RaftComboboxValue", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string; placeholder?: string }>(), { placeholder: "" });
const attrs = useAttrs();
const { values } = useComboboxSelection();
const classes = computed(() => cn("min-w-0 truncate", props.className, attrs.class as string));
</script>

<template>
  <span v-bind="{ ...attrs, class: undefined }" data-slot="combobox-value" :class="classes">
    <slot :value="values">{{ values.length ? values.join(", ") : placeholder }}</slot>
  </span>
</template>
