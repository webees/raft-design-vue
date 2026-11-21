<script setup lang="ts">
import { SelectContent } from "reka-ui";
import { SelectPortal } from "./SelectPortal";
import { select } from "./select.variants";
import { useContentCollision, type PopupPositionerProps } from "../../lib/frame-insets";

defineOptions({ name: "RaftSelectContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    Omit<PopupPositionerProps, "container"> & {
      position?: "item-aligned" | "popper";
      prioritizePosition?: boolean;
      asChild?: boolean;
      forceMount?: boolean;
      to?: string | HTMLElement;
    }
  >(),
  {
    position: "popper",
    side: "bottom",
    sideOffset: 4,
    align: "start",
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: undefined,
    collisionBoundary: undefined,
    anchor: undefined,
    prioritizePosition: false,
    asChild: false,
    forceMount: false,
    to: undefined,
  },
);

const attrs = useAttrs();
const { bindings, ref: setPositioner } = useContentCollision(props, {
  container: () => props.to,
  defaultPadding: 8,
});
const contentClass = computed(() => select().content({ className: attrs.class as string }));
</script>

<template>
  <SelectPortal :to="to">
    <SelectContent
      :ref="setPositioner"
      v-bind="{ ...attrs, class: undefined, ...bindings }"
      :class="contentClass"
      :position="position"
      :prioritize-position="prioritizePosition"
      :as-child="asChild"
      :force-mount="forceMount"
      data-slot="select-content"
      style="
        --available-height: var(--reka-select-content-available-height);
        --available-width: var(--reka-select-content-available-width);
        --anchor-width: var(--reka-select-trigger-width);
      "
    >
      <slot />
    </SelectContent>
  </SelectPortal>
</template>
