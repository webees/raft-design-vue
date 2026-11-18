<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { messageList } from "./message-list.recipe";

defineOptions({ name: "RaftMessageListNotice", inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    as?: string;
    asChild?: boolean;
    class?: string;
    tone?: "faint" | "muted";
  }>(),
  { as: "div", asChild: false, tone: "faint" },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  messageList({ tone: props.tone }).notice({ className: props.class }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-list-notice"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
