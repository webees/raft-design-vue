<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { messageListJump } from "./message-list.recipe";

defineOptions({ name: "RaftMessageListJumpPillGroup", inheritAttrs: false });
withDefaults(
  defineProps<{ as?: string; asChild?: boolean }>(),
  { as: "div", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  messageListJump().group({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-list-jump-pill-group"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
