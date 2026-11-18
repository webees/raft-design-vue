<script setup lang="ts">
import { computed, provide, ref, useAttrs } from "vue";
import type { VNode } from "vue";

import DragLift from "../drag/DragLift.vue";
import DragScope from "../drag/DragScope.vue";
import { useDragSensors } from "../drag/drag-sensors";
import type { DragSession } from "../../lib/drag-engine";
import TabsList from "./TabsList.vue";
import { tabs } from "./tabs.variants";
import { tabsUiContextKey } from "./tabs-context";
import { sortableTabsContextKey } from "./tabs-sortable-context";
import type { TabsPlacement, TabsVariant } from "./tabs.variants";

defineOptions({ name: "RaftSortableTabsList", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: readonly (string | number)[];
    ariaLabel?: string;
    as?: string;
    asChild?: boolean;
    variant?: TabsVariant;
    placement?: TabsPlacement;
    container?: Element | DocumentFragment | null;
  }>(),
  { variant: "default", placement: "top" },
);

const emit = defineEmits<{
  dragStart: [id: string | number];
  reorder: [value: (string | number)[]];
}>();

const attrs = useAttrs();
const ui = { placement: props.placement, variant: props.variant };
provide(tabsUiContextKey, ui);

const activeId = ref<string | null>(null);
const overId = ref<string | null>(null);
const activeSize = ref(0);
const axis = computed<"x" | "y">(() => (props.placement === "left" || props.placement === "right" ? "y" : "x"));
const copies = new Map<string, () => unknown>();

provide(sortableTabsContextKey, {
  value: computed(() => props.value),
  activeId,
  overId,
  activeSize,
  axis,
  copies,
});

const sensors = useDragSensors();

function onDragStart(session: DragSession) {
  activeId.value = String(session.id);
  overId.value = null;
  activeSize.value = axis.value === "x" ? session.rect.width : session.rect.height;
  emit("dragStart", session.id as string | number);
}

function onDragOver(session: DragSession) {
  overId.value = session.over ? String(session.over.id) : null;
}

function onDragEnd(session: DragSession) {
  const from = props.value.findIndex((item) => String(item) === String(session.id));
  const to = props.value.findIndex((item) => String(item) === String(session.over?.id));
  if (from >= 0 && to >= 0 && from !== to) {
    const next = [...props.value];
    const [moved] = next.splice(from, 1);
    if (moved !== undefined) next.splice(to, 0, moved);
    emit("reorder", next);
  }
  reset();
}

function reset() {
  activeId.value = null;
  overId.value = null;
  activeSize.value = 0;
}

const AddedCopy = {
  props: { render: { type: Function, default: undefined } },
  setup: (copyProps: { render?: () => unknown }) => () => copyProps.render?.() as VNode | VNode[] | undefined,
};

const liftClass = computed(() => tabs(ui).tab({ className: "pointer-events-none" }));
const liftContentClass = computed(() => tabs(ui).content());
</script>

<template>
  <DragScope
    :sensors="sensors"
    :on-drag-start="onDragStart"
    :on-drag-over="onDragOver"
    :on-drag-end="onDragEnd"
    :on-drag-cancel="reset"
  >
    <TabsList
      :aria-label="ariaLabel"
      :as="as"
      :as-child="asChild"
      :class="attrs.class as string"
      :data-sorting="activeId ? 'true' : undefined"
    >
      <slot />
    </TabsList>
    <DragLift :container="container" class="rounded-control">
      <span data-slot="tabs-tab" :class="liftClass">
        <span data-slot="tabs-tab-content" :class="liftContentClass">
          <AddedCopy :render="activeId ? copies.get(activeId) : undefined" />
        </span>
      </span>
    </DragLift>
  </DragScope>
</template>
