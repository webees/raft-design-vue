<script setup lang="ts">
import { ContextMenuContent, ContextMenuPortal } from "reka-ui";

import { contextMenu } from "./context-menu.variants";
import { useContentCollision, type PopupPositionerProps } from "../../lib/frame-insets";
import { omitAttrs } from "../../lib/attrs";

defineOptions({ name: "RaftContextMenuContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<
    Pick<
      PopupPositionerProps,
      | "alignOffset"
      | "avoidCollisions"
      | "collisionPadding"
      | "collisionBoundary"
      | "anchor"
      | "container"
    > & {
      forceMount?: boolean;
      loop?: boolean;
    }
  >(),
  {
    alignOffset: 0,
    avoidCollisions: true,
    collisionPadding: undefined,
    collisionBoundary: undefined,
    anchor: undefined,
    container: null,
    forceMount: undefined,
    loop: false,
  },
);

const attrs = useAttrs();
const { bindings, ref: setPositioner } = useContentCollision(props, {
  defaultPadding: 8,
});
const positionerClass = computed(() => contextMenu().positioner());
const contentClass = computed(() =>
  contextMenu().content({ class: attrs.class as string | undefined }),
);
const contentAttrs = computed(() => omitAttrs(attrs, "class"));
</script>

<template>
  <ContextMenuPortal :to="container ?? undefined" :force-mount="forceMount">
    <ContextMenuContent
      :ref="setPositioner"
      v-bind="{ ...contentAttrs, ...bindings }"
      :loop="loop"
      :force-mount="forceMount"
      :class="positionerClass"
    >
      <div data-slot="context-menu-content" :class="contentClass">
        <slot />
      </div>
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
