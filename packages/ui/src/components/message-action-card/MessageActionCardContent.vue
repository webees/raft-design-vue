<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleContent } from "reka-ui";

import MessageEmbedContent from "../message-embed/MessageEmbedContent.vue";
import { messageCard } from "../message-embed/message-embed.variants";
import { messageActionCardContent } from "./message-action-card.recipes";

defineOptions({ name: "RaftMessageActionCardContent", inheritAttrs: false });

const attrs = useAttrs();
const styles = messageActionCardContent();
const innerClass = computed(() => messageCard().inset({ class: styles.root({ class: attrs.class as string | undefined }) }));
</script>

<template>
  <CollapsibleContent
    data-slot="message-action-card-content"
    :class="styles.panel()"
    style="--collapsible-panel-height: var(--reka-collapsible-content-height)"
  >
    <MessageEmbedContent v-bind="{ ...attrs, class: undefined }" :class="innerClass"><slot /></MessageEmbedContent>
  </CollapsibleContent>
</template>
