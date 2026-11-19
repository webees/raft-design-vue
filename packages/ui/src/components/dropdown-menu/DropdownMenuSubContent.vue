<script setup lang="ts">
import { DropdownMenuSubContent } from "reka-ui";
import { useDropdownContent } from "./use-dropdown-content";

defineOptions({ name: "RaftDropdownMenuSubContent", inheritAttrs: false });

withDefaults(
  defineProps<{
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    forceMount?: boolean;
  }>(),
  {
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    forceMount: undefined,
  },
);

const { positionerClass, contentClass, contentAttrs, vars } = useDropdownContent();
</script>

<template>
  <DropdownMenuSubContent
    v-bind="contentAttrs"
    :side-offset="sideOffset"
    :align="align"
    :align-offset="alignOffset"
    :avoid-collisions="avoidCollisions"
    :force-mount="forceMount"
    :class="positionerClass"
  >
    <div data-slot="dropdown-menu-content" :class="contentClass" :style="vars">
      <slot />
    </div>
  </DropdownMenuSubContent>
</template>
