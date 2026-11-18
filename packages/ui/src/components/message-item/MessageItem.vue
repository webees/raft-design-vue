<script setup lang="ts">
import { Primitive } from "reka-ui";

import { toElement } from "../../lib/dom";
import { messageItem } from "./message-item.recipe";
import { provideMessageItemLabels, type MessageItemLabelPart } from "./message-item-context";

defineOptions({ name: "RaftMessageItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    as?: string;
    asChild?: boolean;
    class?: string;
    compact?: boolean;
    located?: boolean;
    role?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
  }>(),
  { as: "div", asChild: false },
);
const attrs = useAttrs();

const rootEl = ref<HTMLDivElement | null>(null);
const parts: Record<MessageItemLabelPart, string[]> = { sender: [], time: [] };

function syncLabels() {
  const el = toElement(rootEl.value);
  if (!el) return;
  const ids = [...parts.sender, ...parts.time].join(" ");
  const consumerRole = props.role ?? el.getAttribute("role") ?? undefined;
  const consumerLabelledBy = props.ariaLabelledby;
  const consumerLabel = props.ariaLabel;
  if (consumerRole === undefined) {
    const named = ids !== "" || consumerLabel !== undefined || consumerLabelledBy !== undefined;
    if (named) el.setAttribute("role", "article");
    else el.removeAttribute("role");
  }
  if (consumerLabelledBy === undefined) {
    const nameable =
      consumerRole === undefined || !["none", "presentation", "generic"].includes(consumerRole);
    if (consumerLabel === undefined && nameable && ids) el.setAttribute("aria-labelledby", ids);
    else el.removeAttribute("aria-labelledby");
  }
}

provideMessageItemLabels((part, id) => {
  parts[part].push(id);
  syncLabels();
  return () => {
    const index = parts[part].indexOf(id);
    if (index !== -1) parts[part].splice(index, 1);
    syncLabels();
  };
}, syncLabels);

const rootClass = computed(() =>
  messageItem({ compact: props.compact }).root({ className: props.class }),
);

onMounted(syncLabels);
watch(() => [props.role, props.ariaLabel, props.ariaLabelledby], syncLabels, {
  flush: "post",
});
</script>

<template>
  <Primitive
    ref="rootEl"
    :as="as"
    :as-child="asChild"
    v-bind="attrs"
    data-slot="message-item"
    data-message-item=""
    :data-compact="compact ? 'true' : undefined"
    :data-located="located ? '' : undefined"
    :class="rootClass"
    :role="role"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
  >
    <slot />
  </Primitive>
</template>
