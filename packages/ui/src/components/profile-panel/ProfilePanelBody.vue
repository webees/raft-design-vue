<script setup lang="ts">
import { PanelBody } from "../panel";
import { conversationPanel } from "../conversation-panel/conversation-panel.variants";

defineOptions({ name: "RaftProfilePanelBody", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => conversationPanel().content({ className: attrs.class as string }));
</script>

<template>
  <PanelBody
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="profile-panel-body"
    :class="rootClass"
  >
    <slot />
  </PanelBody>
</template>
