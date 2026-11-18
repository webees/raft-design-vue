<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { kbdButton } from "./kbd-button.variants";

defineOptions({ name: "RaftKbdButton", inheritAttrs: false });

withDefaults(
  defineProps<{
    recording?: boolean;
    invalid?: boolean;
    disabled?: boolean;
    as?: string;
    asChild?: boolean;
  }>(),
  {
    recording: false,
    invalid: false,
    disabled: false,
    as: "button",
    asChild: false,
  },
);

const attrs = useAttrs();
const rootClass = computed(() => kbdButton().root({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    type="button"
    :disabled="disabled"
    data-slot="kbd-button"
    :data-recording="recording ? '' : undefined"
    :data-invalid="invalid ? '' : undefined"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
