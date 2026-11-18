<script setup lang="ts">
import { CollapsibleRoot } from "reka-ui";

import MessageEmbed from "../message-embed/MessageEmbed.vue";
import { messageActionCard } from "./message-action-card.recipes";

defineOptions({ name: "RaftMessageActionCard", inheritAttrs: false });

withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
  }>(),
  { open: undefined, defaultOpen: true },
);

const emit = defineEmits<{ "update:open": [value: boolean] }>();
const attrs = useAttrs();
const rootClass = computed(() =>
  messageActionCard().root({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <CollapsibleRoot
    as-child
    v-bind="{ ...attrs, class: undefined }"
    :open="open"
    :default-open="defaultOpen"
    @update:open="emit('update:open', $event)"
  >
    <MessageEmbed size="item" data-slot="message-action-card" :class="rootClass">
      <slot />
    </MessageEmbed>
  </CollapsibleRoot>
</template>
