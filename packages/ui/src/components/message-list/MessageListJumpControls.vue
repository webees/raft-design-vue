<script setup lang="ts">
import { Primitive } from "reka-ui";

import { messageListJump } from "./message-list.recipe";

defineOptions({ name: "RaftMessageListJumpControls", inheritAttrs: false });

withDefaults(
  defineProps<{ as?: string; asChild?: boolean; class?: string; side?: "top" | "bottom" }>(),
  { as: "div", asChild: false, side: "bottom" },
);
const attrs = useAttrs();
const slots = messageListJump();
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-list-jump-controls"
    :data-side="side"
    :class="slots.controls({ className: $props.class, side })"
  >
    <slot />
  </Primitive>
</template>
