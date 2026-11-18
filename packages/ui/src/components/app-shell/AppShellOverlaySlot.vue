<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { appShell } from "./app-shell.variants";

defineOptions({ name: "RaftAppShellOverlaySlot", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "div",
  asChild: false,
});

const attrs = useAttrs();
const rootClass = computed(() => appShell().overlaySlot({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="app-shell-overlay-slot"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
