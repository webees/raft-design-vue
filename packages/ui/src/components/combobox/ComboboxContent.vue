<script setup lang="ts">
import { ComboboxContent } from "reka-ui";

import { cn } from "../../lib/cn";
import { combobox } from "./combobox.recipe";
import { ComboboxPortal } from "./ComboboxPortal";
import { useContentCollision, type PopupPositionerProps } from "../../lib/frame-insets";

defineOptions({ name: "RaftComboboxContent", inheritAttrs: false });
const props = withDefaults(
  defineProps<
    PopupPositionerProps & {
      className?: string;
    }
  >(),
  {
    side: "bottom",
    align: "start",
    sideOffset: 4,
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: undefined,
    collisionBoundary: undefined,
    anchor: undefined,
    container: null,
  },
);
const attrs = useAttrs();
const { bindings, ref: setPositioner } = useContentCollision(props, {
  defaultPadding: 8,
});
const classes = computed(() => cn(combobox().content(), props.className, attrs.class as string));
const vars = {
  "--available-width": "var(--reka-combobox-content-available-width)",
  "--available-height": "var(--reka-combobox-content-available-height)",
  "--anchor-width": "var(--reka-combobox-trigger-width)",
};
</script>

<template>
  <ComboboxPortal :to="container ?? undefined">
    <ComboboxContent
      :ref="setPositioner"
      v-bind="{ ...attrs, class: undefined, ...bindings }"
      data-slot="combobox-content"
      :class="classes"
      :style="vars"
    >
      <slot />
    </ComboboxContent>
  </ComboboxPortal>
</template>
