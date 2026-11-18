<script setup lang="ts">
import type { VNode } from "vue";
import { Comment, Fragment, Text } from "vue";
import { TooltipContent, TooltipPortal } from "reka-ui";
import TooltipArrow from "./TooltipArrow.vue";
import { tooltip } from "./tooltip.variants";

defineOptions({ name: "RaftTooltipContent", inheritAttrs: false });

withDefaults(
  defineProps<{
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    alignOffset?: number;
    avoidCollisions?: boolean;
    arrow?: boolean;
    forceMount?: boolean;
  }>(),
  {
    side: "top",
    sideOffset: 8,
    align: "center",
    alignOffset: 0,
    avoidCollisions: true,
    arrow: true,
    forceMount: undefined,
  },
);

const attrs = useAttrs();
const slots = useSlots();

const RenderedNodes = defineComponent({
  name: "RaftRenderedNodes",
  props: { nodes: { type: Array as () => VNode[], required: true } },
  setup(props) {
    return () => props.nodes;
  },
});

function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) =>
    node.type === Fragment && Array.isArray(node.children)
      ? flatten(node.children as VNode[])
      : [node],
  );
}

function isInlinePart(node: VNode) {
  const slot = (node.props as Record<string, unknown> | null)?.["data-slot"];
  return typeof slot === "string" && (slot === "kbd" || slot.startsWith("kbd-"));
}

function isLeadingIcon(node: VNode) {
  if (node.type === Comment || node.type === Text || node.type === Fragment) return false;
  if (isInlinePart(node)) return false;
  if (node.type === "svg") return true;
  return typeof node.type !== "string" && typeof node.type !== "symbol";
}

const partition = computed(() => {
  const items = flatten(slots.default?.() ?? []).filter((node) => node.type !== Comment);
  const icons: VNode[] = [];
  const rest: VNode[] = [];
  let seenNonIcon = false;
  for (const item of items) {
    if (!seenNonIcon && isLeadingIcon(item)) {
      icons.push(item);
      continue;
    }
    seenNonIcon = true;
    rest.push(item);
  }
  return rest.length === 0 ? { icons: [] as VNode[], rest: items } : { icons, rest };
});

const hasLeadingIcon = computed(() => partition.value.icons.length > 0);

const contentClass = computed(() =>
  tooltip().content({ class: attrs.class as string | undefined }),
);
const bodyClass = computed(() =>
  tooltip().body({
    hasLeadingIcon: hasLeadingIcon.value,
    class: attrs.bodyClass as string | undefined,
  }),
);
const bodyIconClass = computed(() => tooltip().bodyIcon());
const bodyTextClass = computed(() => tooltip().bodyText());
const contentAttrs = computed(() => {
  const { class: _class, bodyClass: _bodyClass, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="contentAttrs"
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :avoid-collisions="avoidCollisions"
      :force-mount="forceMount"
      data-slot="tooltip-content"
      :class="contentClass"
      style="
        --available-width: var(--reka-popper-available-width);
        --transform-origin: var(--reka-popper-transform-origin);
      "
    >
      <span data-slot="tooltip-body" :class="bodyClass">
        <template v-if="hasLeadingIcon">
          <span data-slot="tooltip-body-icon" :class="bodyIconClass">
            <RenderedNodes :nodes="partition.icons" />
          </span>
          <span data-slot="tooltip-body-text" :class="bodyTextClass">
            <RenderedNodes :nodes="partition.rest" />
          </span>
        </template>
        <slot v-else />
      </span>
      <TooltipArrow v-if="arrow" />
    </TooltipContent>
  </TooltipPortal>
</template>
