<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";

import { messageList } from "./message-list.recipe";

defineOptions({ name: "RaftMessageListEndFade", inheritAttrs: false });
defineProps(asChildProps());
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
