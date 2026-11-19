<script setup lang="ts">
import { Primitive } from "reka-ui";
import { asChildProps } from "../../lib/part-props";
import { conversationPanelEmptyState } from "./conversation-panel.variants";

defineOptions({ name: "RaftConversationPanelEmptyStateBrand", inheritAttrs: false });

defineProps(asChildProps());
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
