<script setup lang="ts">
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessageGroupHeader", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() =>
  messageSystem().systemGroupHeader({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    data-slot="system-message-group-header"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
