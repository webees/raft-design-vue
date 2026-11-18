<script setup lang="ts">
import { Panel } from "../panel";
import { threadPanel } from "./thread-panel.variants";

defineOptions({ name: "RaftThreadPanelRoot", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "section",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => threadPanel().root({ className: attrs.class as string }));
</script>

<template>
  <Panel
    edge="attached"
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="thread-panel-root"
    :class="rootClass"
  >
    <slot />
  </Panel>
</template>
