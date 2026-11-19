<script setup lang="ts">
import { PanelHeaderRoot } from "../panel";
import { asChildProps } from "../../lib/part-props";
import { threadPanel } from "./thread-panel.variants";

defineOptions({ name: "RaftThreadPanelHeader", inheritAttrs: false });

defineProps(asChildProps());
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
