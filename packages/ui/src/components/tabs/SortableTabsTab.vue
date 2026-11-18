<script setup lang="ts">
import { computed, inject, ref, useSlots } from "vue";

import { useSortableItem } from "../drag/use-sortable-item";
import TabsTab from "./TabsTab.vue";
import { sortableTabsContextKey } from "./tabs-sortable-context";

defineOptions({ name: "RaftSortableTabsTab", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: string | number;
    disabled?: boolean;
    as?: string;
    asChild?: boolean;
  }>(),
  { disabled: false, asChild: false },
);

const slots = useSlots();
const context = inject(sortableTabsContextKey, null);
const tabRef = ref<unknown>(null);
const key = computed(() => String(props.value));
const index = computed(
  () => context?.value.value.findIndex((item) => String(item) === key.value) ?? -1,
);

const sortable = useSortableItem({
  id: key.value,
  data: { value: props.value },
  target: tabRef,
  disabled: props.disabled,
});

if (context) {
  context.copies.set(key.value, () => slots.default?.());
}

const dragging = computed(() => sortable.dragging.value);
const home = computed(() => !context?.activeId.value || context.activeId.value === key.value);

const shift = computed(() => {
  const ctx = context;
  const active = ctx?.activeId.value;
  const over = ctx?.overId.value;
  if (!ctx || !active || !over) return 0;
  const from = ctx.value.value.findIndex((item) => String(item) === active);
  const to = ctx.value.value.findIndex((item) => String(item) === over);
  const self = index.value;
  if (from < 0 || to < 0 || self < 0 || from === to || self === from) return 0;
  if (from < to) return self > from && self <= to ? -ctx.activeSize.value : 0;
  return self >= to && self < from ? ctx.activeSize.value : 0;
});

const style = computed(() => {
  if (!context || shift.value === 0) return undefined;
  const pixel = `${shift.value}px`;
  return {
    transform: context.axis.value === "x" ? `translateX(${pixel})` : `translateY(${pixel})`,
    transition: "transform 160ms cubic-bezier(0.25, 1, 0.5, 1)",
  };
});
</script>

<template>
  <TabsTab
    ref="tabRef"
    v-bind="$attrs"
    :value="value"
    :disabled="disabled"
    :as="as"
    :as-child="asChild"
    :style="style"
    :data-reorderable="context ? '' : undefined"
    :data-dragging-active="dragging ? 'true' : undefined"
    :data-dragging-source="dragging ? 'true' : undefined"
    :data-drag-origin="dragging && home ? '' : undefined"
    :drop-place="dragging && !home"
    @pointerdown="sortable.onPointerDown"
    @keydown.capture="sortable.onKeydown"
  >
    <slot />
  </TabsTab>
</template>
