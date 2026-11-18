<script setup lang="ts">
import { Primitive } from "reka-ui";

import { cn } from "../../lib/cn";
import { PanelAction } from "../panel";
import { useOptionalAppShellSidebar } from "./app-shell-context";

defineOptions({ name: "RaftAppShellSidebarTrigger", inheritAttrs: false });
const attrs = useAttrs();

const props = withDefaults(
  defineProps<{
    as?: string;
    asChild?: boolean;
    class?: string;
  }>(),
  {
    as: undefined,
    asChild: false,
    class: undefined,
  },
);

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const sidebar = useOptionalAppShellSidebar();

const label = computed(() => (sidebar?.open ? "Collapse sidebar" : "Expand sidebar"));
const rootClass = computed(() =>
  cn(
    "group/app-shell-sidebar-trigger max-md:hidden",
    props.class,
    attrs.class as string | undefined,
  ),
);

const handleClick = (event: MouseEvent) => {
  emit("click", event);
  if (!event.defaultPrevented) sidebar?.toggle();
};
</script>

<template>
  <template v-if="sidebar?.collapsible">
    <Primitive
      v-if="as"
      :as="as"
      :as-child="asChild"
      :aria-label="label"
      :aria-controls="sidebar.sidebarId"
      :aria-expanded="sidebar.open"
      :data-state="sidebar.open ? 'expanded' : 'collapsed'"
      data-slot="app-shell-sidebar-trigger"
      :title="label"
      :class="rootClass"
      v-bind="{ ...attrs, class: undefined }"
      @click="handleClick"
    >
      <slot />
    </Primitive>
    <PanelAction
      v-else
      :as-child="asChild"
      :aria-label="label"
      :aria-controls="sidebar.sidebarId"
      :aria-expanded="sidebar.open"
      :data-state="sidebar.open ? 'expanded' : 'collapsed'"
      data-slot="app-shell-sidebar-trigger"
      :title="label"
      :class="rootClass"
      v-bind="{ ...attrs, class: undefined }"
      @click="handleClick"
    >
      <slot />
    </PanelAction>
  </template>
</template>
