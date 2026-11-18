<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";
import { dropdownMenu } from "./dropdown-menu.variants";

defineOptions({ name: "RaftDropdownMenuContent", inheritAttrs: false });

withDefaults(
  defineProps<{
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    loop?: boolean;
    forceMount?: boolean;
  }>(),
  {
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    loop: false,
    forceMount: undefined,
  },
);

const attrs = useAttrs();
const positionerClass = computed(() => dropdownMenu().positioner());
const contentClass = computed(() =>
  dropdownMenu().content({ class: attrs.class as string | undefined }),
);
const contentAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const vars = { "--available-height": "var(--reka-dropdown-menu-content-available-height)" };
</script>

<template>
  <DropdownMenuPortal :force-mount="forceMount">
    <DropdownMenuContent
      v-bind="contentAttrs"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :loop="loop"
      :force-mount="forceMount"
      :class="positionerClass"
    >
      <div data-slot="dropdown-menu-content" :class="contentClass" :style="vars">
        <slot />
      </div>
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
