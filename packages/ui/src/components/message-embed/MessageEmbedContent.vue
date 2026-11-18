<script setup lang="ts">
import { messageEmbed } from "./message-embed.variants";

defineOptions({ name: "RaftMessageEmbedContent", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() => messageEmbed().content({ className: attrs.class as string }));
</script>

<template>
  <div v-bind="{ ...attrs, class: undefined }" data-slot="message-embed-content" :class="rootClass">
    <slot />
  </div>
</template>
