<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessageTime", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  messageSystem().systemTime({ className: attrs.class as string }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="system-message-item-time"
    :class="rootClass"
  >
    <slot />
  </span>
</template>
