<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxTrigger } from "reka-ui";

import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import { useComboboxSelection } from "./combobox-context";

defineOptions({ name: "RaftComboboxTrigger", inheritAttrs: false });
const props = withDefaults(defineProps<{ className?: string }>(), {});
const attrs = useAttrs();
const classes = computed(() => cn(combobox().trigger(), props.className, attrs.class as string));
const { values } = useComboboxSelection();
</script>

<template>
  <ComboboxTrigger
    v-bind="{ ...attrs, class: undefined }"
    data-slot="combobox-trigger"
    :data-has-value="values.length ? '' : undefined"
    :class="classes"
  >
    <span
      data-slot="combobox-trigger-content"
      data-picker-trigger-content="combobox"
      class="flex min-w-0 flex-1 items-center gap-1.5"
    >
      <slot />
    </span>
  </ComboboxTrigger>
</template>
