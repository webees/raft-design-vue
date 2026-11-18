<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { kbdButton } from "./kbd-button.variants";

defineOptions({ name: "RaftKbdButtonCaret", inheritAttrs: false });

defineProps<{ as?: string }>();

const attrs = useAttrs();
const caretClass = computed(() => kbdButton().caret({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as ?? 'span'"
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    data-slot="kbd-button-caret"
    :class="caretClass"
  />
</template>
