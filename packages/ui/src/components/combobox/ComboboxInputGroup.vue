<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { combobox } from "./combobox.recipe";
import { provideComboboxInputOwner } from "./combobox-context";
import { cn } from "../../lib/cn";
defineOptions({ name: "RaftComboboxInputGroup", inheritAttrs: false });
provideComboboxInputOwner("group");
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().inputGroup(), props.className, attrs.class as string));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="combobox-input-group" :class="classes">
    <slot />
  </div>
</template>
