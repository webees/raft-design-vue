<script setup lang="ts">
import { messageEmbed } from "./message-embed.variants";

defineOptions({ name: "RaftMessageEmbedFooter", inheritAttrs: false });

const attrs = useAttrs();
const rootClass = computed(() => messageEmbed().footer({ className: attrs.class as string }));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'message-embed-footer'"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
