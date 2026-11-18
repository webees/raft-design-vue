<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { PanelHeaderRoot } from "../panel";
import { threadPanel } from "./thread-panel.variants";

defineOptions({ name: "RaftThreadPanelHeader", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});
const attrs = useAttrs();
const rootClass = computed(() => threadPanel().header({ className: attrs.class as string }));
</script>

<template>
  <PanelHeaderRoot
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-panel-frame-header=""
    data-slot="thread-panel-header"
    :class="rootClass"
  >
    <slot />
  </PanelHeaderRoot>
</template>
