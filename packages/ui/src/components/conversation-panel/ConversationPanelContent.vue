<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { Primitive } from "reka-ui";
import { conversationPanel } from "./conversation-panel.variants";

defineOptions({ name: "RaftConversationPanelContent", inheritAttrs: false });

defineProps(asChildProps());
const attrs = useAttrs();
const rootClass = computed(() => conversationPanel().content({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="conversation-panel-content"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
