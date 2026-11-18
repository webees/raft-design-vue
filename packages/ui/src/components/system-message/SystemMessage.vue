<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageSystem } from "./system-message.variants";

defineOptions({ name: "RaftSystemMessage", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() => messageSystem().systemRoot({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="system-message-item" :class="rootClass">
    <slot />
  </div>
</template>
