<script setup lang="ts">
import { ComboboxInput } from "reka-ui";

import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import { useComboboxInputOwner, type ComboboxInputOwner } from "./combobox-context";

defineOptions({ name: "RaftComboboxInput", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    className?: string;
    placeholder?: string;
    owner?: ComboboxInputOwner;
    suppressPasswordManager?: boolean;
  }>(),
  { suppressPasswordManager: false },
);
const ownerContext = useComboboxInputOwner();
const attrs = useAttrs();
const classes = computed(() =>
  cn(
    combobox().input({ inputOwner: props.owner ?? ownerContext?.value }),
    props.suppressPasswordManager && "keeper-ignore",
    props.className,
    attrs.class as string,
  ),
);
</script>

<template>
  <ComboboxInput
    v-bind="{ ...attrs, class: undefined }"
    data-slot="combobox-input"
    :data-1p-ignore="props.suppressPasswordManager ? 'true' : undefined"
    :data-bwignore="props.suppressPasswordManager ? 'true' : undefined"
    :data-form-type="props.suppressPasswordManager ? 'other' : undefined"
    :data-lpignore="props.suppressPasswordManager ? 'true' : undefined"
    :placeholder="placeholder"
    :class="classes"
  />
</template>
