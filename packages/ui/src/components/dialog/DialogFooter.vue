<script setup lang="ts">
import type { VNode } from "vue";
import { dialog } from "./dialog.variants";
import { useDialogSheet } from "./dialog-sheet-context";
import { useDialogContext } from "./dialog-context";
import { VNodeList } from "../../lib/vnode-list";
import { useStackedActions } from "../../lib/use-stacked-actions";

defineOptions({ name: "RaftDialogFooter", inheritAttrs: false });

const props = withDefaults(defineProps<{ bar?: boolean; start?: boolean }>(), {
  bar: false,
  start: false,
});
const attrs = useAttrs();
const slots = useSlots();
const ctx = useDialogContext();
const sheet = useDialogSheet();
const barRef = toRef(props, "bar");
function nodeName(node: VNode) {
  const type = node.type as { name?: string } | string | undefined;
  return typeof type === "string" ? type : type?.name;
}

function hasContent(node: VNode) {
  const children = node.children;
  if (children == null || children === "") return false;
  if (typeof children === "string") return children.trim() !== "";
  if (Array.isArray(children)) return children.length > 0;
  return true;
}

/** The quiet item: a note with content anywhere, or a link written first. */
function splitFooter(nodes: VNode[]) {
  const start =
    nodes.find((node) => nodeName(node) === "RaftDialogFooterNote" && hasContent(node)) ??
    (nodeName(nodes[0]!) === "TextLink" || nodeName(nodes[0]!) === "RaftTextLink"
      ? nodes[0]
      : undefined);
  return { start, actions: nodes.filter((node) => node !== start) };
}

const sheetHidden = computed(() => !!sheet?.sheet.value);
const groups = computed(() => splitFooter((slots.default?.() ?? []) as VNode[]));
const hasStart = computed(() => groups.value.start !== undefined);
const styles = computed(() =>
  dialog({ bar: barRef.value || ctx.bar(), start: props.start || hasStart.value }),
);
const footerClass = computed(() => styles.value.footer({ className: attrs.class as string }));
const actionsClass = computed(() => styles.value.footerActions());
const { rowRef, stacked } = useStackedActions<HTMLElement>({ inParent: hasStart.value });
</script>

<template>
  <div
    :ref="hasStart ? undefined : rowRef"
    v-bind="{ ...attrs, class: undefined }"
    :class="footerClass"
    :hidden="sheetHidden"
    data-slot="dialog-footer"
    :data-stacked="!hasStart && stacked ? '' : undefined"
  >
    <Teleport v-if="sheetHidden && sheet?.bodyEndSlot.value" :to="sheet.bodyEndSlot.value">
      <VNodeList v-if="groups.start" :nodes="[groups.start]" />
    </Teleport>
    <template v-if="hasStart">
      <VNodeList v-if="!sheetHidden" :nodes="[groups.start!]" />
      <div
        :ref="rowRef"
        :class="actionsClass"
        :data-stacked="stacked ? '' : undefined"
        data-slot="dialog-footer-actions"
      >
        <VNodeList :nodes="groups.actions" />
      </div>
    </template>
    <VNodeList v-else :nodes="groups.actions" />
  </div>
</template>
