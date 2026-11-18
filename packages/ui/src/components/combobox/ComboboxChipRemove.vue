<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { X } from "lucide-vue-next";
import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import { useComboboxSelection } from "./combobox-context";
defineOptions({ name: "RaftComboboxChipRemove", inheritAttrs: false });
const props = withDefaults(defineProps<{ value?: string; label?: string; className?: string }>(), {
  label: "Remove",
});
const attrs = useAttrs();
const { context, values } = useComboboxSelection();
const classes = computed(() => cn(combobox().chipRemove(), props.className, attrs.class as string));
</script>

<template>
  <button
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    data-slot="combobox-chip-remove"
    :aria-label="label"
    :class="classes"
    @click="
      props.value
        ? context?.setValue(values.filter((item) => item !== props.value))
        : context?.clear()
    "
  >
    <slot><X aria-hidden="true" /></slot>
  </button>
</template>
