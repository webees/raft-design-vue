<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxGroup } from "reka-ui";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxGroup", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn("py-1", props.className, attrs.class as string));
</script>

<template>
  <ComboboxGroup v-bind="{ ...attrs, class: undefined }" data-slot="combobox-group" :class="classes"><slot /></ComboboxGroup>
</template>
