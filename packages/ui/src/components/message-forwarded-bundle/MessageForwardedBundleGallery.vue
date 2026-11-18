<script setup lang="ts">
import type { VNode } from "vue";
import { Comment, Fragment, Text } from "vue";

import { VNodeList } from "../../lib/vnode-list";
import MessageImageGallery from "../message-attachment/MessageImageGallery.vue";
import { messageForwardedBundleGallery } from "./message-forwarded-bundle.recipes";

defineOptions({ name: "RaftMessageForwardedBundleGallery", inheritAttrs: false });

const attrs = useAttrs();
const slots = useSlots();

/**
 * Image rows for forwarded attachments. The gallery owns the layout — rows of
 * three (a lone row of exactly four splits two-and-two so the tiles keep a
 * useful size) — and each tile keeps the caller's own node.
 */
function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node): VNode[] => {
    if (node.type === Fragment) return flatten((node.children as VNode[] | null) ?? []);
    if (node.type === Comment) return [];
    if (node.type === Text && !node.children?.toString().trim()) return [];
    return [node];
  });
}

function chunk(nodes: VNode[]): VNode[][] {
  const items = flatten(nodes);
  const size = items.length === 4 ? 2 : 3;
  const rows: VNode[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}

const rows = computed(() => chunk((slots.default?.() ?? []) as VNode[]));
const rootClass = computed(() =>
  messageForwardedBundleGallery().root({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <MessageImageGallery v-bind="{ ...attrs, class: undefined }" :class="rootClass">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      data-slot="message-forwarded-bundle-gallery-row"
      :class="messageForwardedBundleGallery({ count: Math.min(row.length, 3) as 1 | 2 | 3 }).row()"
    >
      <VNodeList :nodes="row" />
    </div>
  </MessageImageGallery>
</template>
