<script setup lang="ts">
import { ToggleGroupItem } from "reka-ui";
import { useTapActivation } from "../../lib/tap-activation";
import { toggleGroup } from "./toggle-group.variants";

defineOptions({ name: "RaftToggleGroupItem", inheritAttrs: false });

withDefaults(
  defineProps<{
    value: string | number;
    disabled?: boolean;
    as?: string;
    asChild?: boolean;
  }>(),
  { disabled: false, asChild: false },
);

const attrs = useAttrs();
const tapRef = useTapActivation();
const itemClass = computed(() => toggleGroup().item({ className: attrs.class as string }));
</script>

<template>
  <ToggleGroupItem
    :ref="tapRef"
    v-bind="{ ...attrs, class: undefined }"
    :value="value"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    data-slot="toggle-group-item"
    :class="itemClass"
  >
    <slot />
  </ToggleGroupItem>
</template>
