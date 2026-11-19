<script setup lang="ts">
import { panelRootProps } from "../../lib/part-props";
import { Panel } from "../panel";
import { conversationPanel } from "./conversation-panel.variants";

defineOptions({ name: "RaftConversationPanelRoot", inheritAttrs: false });

defineProps(panelRootProps());
const attrs = useAttrs();
const rootClass = computed(() => conversationPanel().root({ className: attrs.class as string }));
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
