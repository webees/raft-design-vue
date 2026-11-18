<script setup lang="ts">
import { PanelFooter } from "../panel";
import { conversationPanel } from "./conversation-panel.variants";

defineOptions({ name: "RaftConversationPanelFooter", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => conversationPanel().footer({ className: attrs.class as string }));
</script>

<template>
  <PanelFooter
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="conversation-panel-footer"
    :class="rootClass"
  >
    <slot />
  </PanelFooter>
</template>
