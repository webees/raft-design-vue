<script setup lang="ts">
import { asChildProps } from "../../lib/part-props";
import { PanelFooter } from "../panel";
import { threadPanel } from "./thread-panel.variants";

defineOptions({ name: "RaftThreadPanelFooter", inheritAttrs: false });

defineProps(asChildProps());
const attrs = useAttrs();
const rootClass = computed(() => threadPanel().footer({ className: attrs.class as string }));
</script>

<template>
  <PanelFooter
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="thread-panel-footer"
    :class="rootClass"
  >
    <slot />
  </PanelFooter>
</template>
