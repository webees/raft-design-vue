<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";

import { messageList } from "./message-list.recipe";

defineOptions({ name: "RaftMessageListHistoryLimited", inheritAttrs: false });
defineProps(asChildProps("span"));
const attrs = useAttrs();
const rootClass = computed(() =>
  messageList().historyLimited({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="message-list-history-limited"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
