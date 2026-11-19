<script setup lang="ts">
import { ComboboxViewport } from "reka-ui";

import ScrollableListFrame from "../scroll-area/ScrollableListFrame.vue";
import { combobox } from "./combobox.recipe";

defineOptions({ name: "RaftComboboxList", inheritAttrs: false });

const attrs = useAttrs();
const styles = combobox();
const className = computed(() => attrs.class as string | undefined);
</script>

<template>
  <ScrollableListFrame
    v-bind="$attrs"
    :viewport="ComboboxViewport"
    viewport-slot="combobox-list"
    tabindex="-1"
    :frame-class="styles.listFrame({ class: className })"
    :list-class="styles.list({ class: className })"
  >
    <slot />
  </ScrollableListFrame>
</template>
