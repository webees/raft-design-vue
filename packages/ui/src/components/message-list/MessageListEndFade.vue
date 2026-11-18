<script setup lang="ts">
import { Primitive } from "reka-ui";

import { messageList } from "./message-list.recipe";

defineOptions({ name: "RaftMessageListEndFade", inheritAttrs: false });
withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), { as: "div", asChild: false });
const attrs = useAttrs();
const rootClass = computed(() => messageList().endFade({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    aria-hidden="true"
    data-slot="message-list-end-fade"
    :class="rootClass"
  />
</template>
