<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { appShell } from "./app-shell.variants";
import { useOptionalAppShellSidebar } from "./app-shell-context";

defineOptions({ name: "RaftAppShellMainSlot", inheritAttrs: false });

const props = withDefaults(defineProps<{ as?: string; asChild?: boolean; overlay?: boolean }>(), {
  as: "main",
  asChild: false,
  overlay: false,
});

const attrs = useAttrs();
const sidebar = useOptionalAppShellSidebar();

const rootClass = computed(() => {
  const collapsible = sidebar?.collapsible ?? false;
  return appShell({ overlay: props.overlay }).mainSlot({
    className: cn(
      attrs.class as string,
      collapsible && [
        "absolute inset-y-0 right-0 left-0",
        "group-data-[state=collapsed]/app-shell:-left-(--app-shell-sidebar-width)",
      ],
    ),
  });
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="app-shell-main-slot"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
