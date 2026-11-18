<script setup lang="ts">
import { SelectItem } from "reka-ui";

import { cn } from "../../lib/cn";
import { SelectAction } from "./select-action";
import { useSelectChrome } from "./select-context";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectActionItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    class?: string;
    action?: () => void;
    close?: boolean;
    disabled?: boolean;
  }>(),
  { action: undefined, close: false, disabled: false },
);

const attrs = useAttrs();
const chrome = useSelectChrome();
const value = new SelectAction(() => props.action?.(), props.close);
const actionClass = computed(() =>
  select({ chrome: chrome.value }).actionItem({
    className: cn(props.class, attrs.class as string),
  }),
);
</script>

<template>
  <SelectItem
    v-bind="{ ...attrs, class: undefined }"
    :value="value"
    :disabled="disabled"
    data-slot="select-action-item"
    :class="actionClass"
  >
    <slot />
  </SelectItem>
</template>
