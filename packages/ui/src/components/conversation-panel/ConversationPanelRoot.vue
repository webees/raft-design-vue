<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Panel } from "../panel";
import { conversationPanel } from "./conversation-panel.variants";

defineOptions({ name: "RaftConversationPanelRoot", inheritAttrs: false });

withDefaults(
  defineProps<{ edge?: "attached" | "inset"; as?: string; asChild?: boolean }>(),
  { edge: "inset", as: "section", asChild: false },
);
const attrs = useAttrs();
const rootClass = computed(() =>
  conversationPanel().root({ className: attrs.class as string }),
);
</script>

<template>
  <Panel
    :edge="edge"
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="conversation-panel-root"
    :class="rootClass"
  >
    <slot />
  </Panel>
</template>
