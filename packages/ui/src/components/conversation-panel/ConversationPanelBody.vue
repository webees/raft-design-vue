<script setup lang="ts">
import { PanelBody } from "../panel";

defineOptions({ name: "RaftConversationPanelBody", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => (attrs.class as string | undefined) ?? "");
</script>

<template>
  <PanelBody
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="conversation-panel-body"
    :class="rootClass"
  >
    <slot />
  </PanelBody>
</template>
