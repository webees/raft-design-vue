<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { kbdButton } from "./kbd-button.variants";

defineOptions({ name: "RaftKbdButtonPlaceholder", inheritAttrs: false });

defineProps<{ as?: string; asChild?: boolean }>();

const attrs = useAttrs();
const placeholderClass = computed(() =>
  kbdButton().placeholder({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="kbd-button-placeholder"
    :class="placeholderClass"
  >
    <slot />
  </Primitive>
</template>
