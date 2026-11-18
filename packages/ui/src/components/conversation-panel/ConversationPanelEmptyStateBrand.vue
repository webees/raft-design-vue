<script setup lang="ts">
import { Primitive } from "reka-ui";
import { conversationPanelEmptyState } from "./conversation-panel.variants";

defineOptions({ name: "RaftConversationPanelEmptyStateBrand", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() =>
  conversationPanelEmptyState().brand({ className: attrs.class as string }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="conversation-panel-empty-state-brand"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
