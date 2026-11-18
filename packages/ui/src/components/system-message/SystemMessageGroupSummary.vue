<script setup lang="ts">
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessageGroupSummary", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  messageSystem().systemGroupSummary({ className: attrs.class as string }),
);
</script>

<template>
  <span
    v-bind="{ ...attrs, class: undefined }"
    data-slot="system-message-group-summary"
    :class="rootClass"
  >
    <slot />
  </span>
</template>
