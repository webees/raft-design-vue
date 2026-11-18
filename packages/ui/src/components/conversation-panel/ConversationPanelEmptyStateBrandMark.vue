<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { conversationPanelEmptyState } from "./conversation-panel.variants";

defineOptions({ name: "RaftConversationPanelEmptyStateBrandMark", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() =>
  conversationPanelEmptyState().brandMark({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="conversation-panel-empty-state-brand-mark"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
