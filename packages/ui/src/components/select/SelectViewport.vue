<script setup lang="ts">
import { SelectViewport } from "reka-ui";

import ScrollableListFrame from "../scroll-area/ScrollableListFrame.vue";
import { select } from "./select.variants";

defineOptions({ name: "RaftSelectList", inheritAttrs: false });

const attrs = useAttrs();
const styles = select();
const className = computed(() => attrs.class as string | undefined);
</script>

<template>
  <ScrollableListFrame
    v-bind="$attrs"
    :viewport="SelectViewport"
    viewport-slot="select-list"
    :frame-class="styles.listFrame()"
    :list-class="styles.list({ className })"
  >
    <slot />
  </ScrollableListFrame>
</template>
