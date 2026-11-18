<script setup lang="ts">
import type { VNode } from "vue";
import { Comment, Fragment, Text } from "vue";

import { cn } from "../../lib/cn";
import { VNodeList } from "../../lib/vnode-list";
import { mobileNavServer } from "./mobile-nav-server.recipe";

defineOptions({ name: "RaftMobileNavServerPopoverDestinations", inheritAttrs: false });

const attrs = useAttrs();
const slots = useSlots();

/** Count elements the way React's Children does: look inside fragments, skip text. */
function countElements(nodes: VNode[]): number {
  return nodes.reduce((total, node) => {
    if (node.type === Fragment)
      return total + countElements((node.children as VNode[] | null) ?? []);
    if (node.type === Comment || node.type === Text) return total;
    return total + 1;
  }, 0);
}

const items = computed(() => (slots.default?.() ?? []) as VNode[]);
const layout = computed(() => (countElements(items.value) > 4 ? "grid" : "row"));
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    role="group"
    data-slot="mobile-nav-server-popover-destinations"
    :data-layout="layout"
    :class="mobileNavServer().destinations({ class: cn(attrs.class as string | undefined) })"
  >
    <VNodeList :nodes="items" />
  </div>
</template>
