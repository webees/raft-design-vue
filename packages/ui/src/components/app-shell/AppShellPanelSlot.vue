<script setup lang="ts">
import { Primitive } from "reka-ui";

import { appShell } from "./app-shell.variants";

defineOptions({ name: "RaftAppShellPanelSlot", inheritAttrs: false });

withDefaults(defineProps<{ as?: string; asChild?: boolean }>(), {
  as: "aside",
  asChild: false,
});

const attrs = useAttrs();
const rootClass = computed(() => appShell().panelSlot({ className: attrs.class as string }));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="app-shell-panel-slot"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
