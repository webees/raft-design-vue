<script setup lang="ts">
import type { ComponentPublicInstance, VNode } from "vue";
import { Comment, Fragment, Text } from "vue";
import { VNodeList } from "../../lib/vnode-list";
import { PopupSheetReset } from "../../lib/popup-boundary";
import { dialog } from "./dialog.variants";
import { dialogSheet, dialogSheetHeadKey, useInDialogSheet } from "./dialog-sheet-context";
import { useDialogContext } from "./dialog-context";

defineOptions({ name: "RaftDialogHeader", inheritAttrs: false });

const props = withDefaults(defineProps<{ bar?: boolean }>(), { bar: false });
const attrs = useAttrs();
const ctx = useDialogContext();
const { sheet, inSheet } = useInDialogSheet();
provide(dialogSheetHeadKey, inSheet);
const commitSlot = sheet?.commitSlot ?? ref<HTMLElement | null>(null);
const setCommitSlot = (node: Element | ComponentPublicInstance | null) => {
  commitSlot.value = node instanceof HTMLElement ? node : null;
};
const barRef = toRef(props, "bar");
const slots = useSlots();

const isComponent = (node: VNode, name: string) => {
  const type = node.type as { name?: string; __name?: string } | undefined;
  return type?.name === name || type?.__name === name;
};

/**
 * A phone sheet: the leading action goes first in the DOM, so every browser
 * reads and tabs the head in the order it is seen — a DialogSheetBack when
 * the step has one (it stands in for ×), otherwise the DialogClose.
 */
const headItems = computed(() => {
  if (!inSheet.value) return { leading: [] as VNode[], rest: slots.default?.() ?? [] };
  const children = (slots.default?.() ?? []).flatMap((node) =>
    node.type === Fragment && Array.isArray(node.children) ? (node.children as VNode[]) : [node],
  );
  const meaningful = children.filter((node) => node.type !== Comment && node.type !== Text);
  const backs = meaningful.filter((node) => isComponent(node, "RaftDialogSheetBack"));
  const closes = meaningful.filter((node) => isComponent(node, "RaftDialogClose"));
  const leading = backs.length ? backs : closes;
  return {
    leading,
    rest: meaningful.filter((node) => !leading.includes(node)),
  };
});

watchEffect(() => {
  if (
    (typeof process !== "undefined" && process.env?.NODE_ENV === "production") ||
    !inSheet.value
  ) {
    return;
  }
  const { leading, rest } = headItems.value;
  if (leading.length > 0 || rest.length === 0) return;
  console.warn(
    "raft-ui: a DialogHeader drawn as a phone sheet has no DialogClose (or DialogSheetBack) as a direct child, so the sheet has no × at the start of its head. Put DialogClose directly in DialogHeader, not inside a Tooltip, a Fragment or a component of your own.",
  );
});

const headerClass = computed(() =>
  inSheet.value
    ? dialogSheet().header({ className: attrs.class as string })
    : dialog({ bar: barRef.value || ctx.bar() }).header({ className: attrs.class as string }),
);
</script>

<template>
  <div
    v-bind="{ ...attrs, class: undefined }"
    :class="headerClass"
    data-slot="dialog-header"
    :data-sheet="inSheet ? '' : undefined"
  >
    <template v-if="inSheet">
      <PopupSheetReset>
        <VNodeList :nodes="headItems.leading" />
        <VNodeList :nodes="headItems.rest" />
      </PopupSheetReset>
    </template>
    <slot v-else />
    <div
      v-if="inSheet"
      :ref="setCommitSlot"
      :class="dialogSheet().commitSlot()"
      data-slot="dialog-commit-slot"
    />
  </div>
</template>
