<script setup lang="ts">
import { SelectItemText } from "reka-ui";
import { useOverflowTitle } from "../../lib/use-overflow-title";
import { select } from "./select.variants";
import { useSelectItemParts } from "./select-context";

defineOptions({ name: "RaftSelectItemText", inheritAttrs: false });

const attrs = useAttrs();
const textEl = ref<HTMLElement | null>(null);
const setTextEl = (value: unknown) => {
  const isElement = (candidate: unknown): candidate is HTMLElement =>
    typeof HTMLElement !== "undefined" && candidate instanceof HTMLElement;
  if (isElement(value)) {
    textEl.value = value;
    return;
  }
  const inner = (value as { $el?: unknown } | null)?.$el;
  textEl.value = isElement(inner) ? inner : null;
};
const parts = useSelectItemParts();
const generatedId = useId();
const textId = computed(() => (attrs.id as string | undefined) ?? generatedId);

useOverflowTitle(textEl, () => attrs.title as string | undefined);
onMounted(() => {
  if (parts) parts.textId.value = textId.value;
});
onBeforeUnmount(() => {
  if (parts) parts.textId.value = undefined;
});
const textClass = computed(() => select().itemText({ className: attrs.class as string }));
</script>

<template>
  <SelectItemText
    :ref="setTextEl"
    v-bind="{ ...attrs, class: undefined }"
    :id="textId"
    :class="textClass"
    data-slot="select-item-text"
  >
    <slot />
  </SelectItemText>
</template>
