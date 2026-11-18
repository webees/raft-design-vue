<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { appRail } from "./app-rail.variants";

defineOptions({ name: "RaftAppRailItem", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    selected?: boolean;
    disabled?: boolean;
    nativeButton?: boolean;
    as?: string;
    asChild?: boolean;
    class?: string;
  }>(),
  { selected: false, disabled: false, nativeButton: true, as: "button", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() => appRail().item({ class: props.class }));
</script>

<template>
  <Primitive
    :as="nativeButton ? as : as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :type="nativeButton ? 'button' : undefined"
    :disabled="nativeButton ? disabled : undefined"
    :aria-pressed="nativeButton ? selected : undefined"
    data-slot="app-rail-item"
    :data-selected="selected ? 'true' : undefined"
    :data-disabled="disabled ? 'true' : undefined"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
