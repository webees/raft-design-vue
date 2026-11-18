<script setup lang="ts">
import { combobox } from "./combobox.recipe";
import { provideComboboxInputOwner } from "./combobox-context";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxControl", inheritAttrs: false });
provideComboboxInputOwner("control");
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().control(), props.className, attrs.class as string));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="combobox-control" :class="classes">
    <slot />
  </div>
</template>
