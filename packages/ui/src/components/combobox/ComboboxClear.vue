<script setup lang="ts">
import { X } from "lucide-vue-next";
import { cn } from "../../lib/cn";
import { useComboboxSelection } from "./combobox-context";
import { combobox } from "./combobox.recipe";
defineOptions({ name: "RaftComboboxClear", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string; label?: string }>(), {
  label: "Clear",
});
const attrs = useAttrs();
const { context, values } = useComboboxSelection();
const classes = computed(() => cn(combobox().clear(), props.className, attrs.class as string));
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="combobox-clear"
    :data-visible="values.length ? '' : undefined"
    :aria-label="label"
    :class="classes"
    @click="context?.clear()"
  >
    <slot><X aria-hidden="true" /></slot>
  </button>
</template>
