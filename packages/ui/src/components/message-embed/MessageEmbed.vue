<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { messageEmbed } from "./message-embed.variants";

defineOptions({ name: "RaftMessageEmbed", inheritAttrs: false });

const props = withDefaults(
  defineProps<{ interactive?: boolean; size?: "item" | "content" }>(),
  { interactive: false },
);

const attrs = useAttrs();
const rootClass = computed(() =>
  messageEmbed({ size: props.size }).root({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'message-embed'"
    :data-interactive="interactive ? 'true' : undefined"
    :class="rootClass"
  >
    <slot />
  </div>
</template>
