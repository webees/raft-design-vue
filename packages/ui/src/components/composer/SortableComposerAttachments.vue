<script setup lang="ts">
import type { DragSession } from "../../lib/drag-engine";
import { createDragAnnouncements, type DragMessages } from "../drag/drag-announcements";
import DragLift from "../drag/DragLift.vue";
import DragLiveRegion from "../drag/DragLiveRegion.vue";
import DragScope from "../drag/DragScope.vue";
import { useDragSensors } from "../drag/drag-sensors";
import { useDragSiblingTransition } from "../drag/drag-lift";
import SortableComposerAttachment from "./SortableComposerAttachment.vue";
import { composerSortableContextKey } from "./composer-sortable-context";

defineOptions({ name: "RaftSortableComposerAttachments", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    items: readonly string[];
    /** Where the lifted copy renders; the body by default. `null` renders in place. */
    container?: Element | DocumentFragment | null;
    /** Wrap into rows (default) instead of a single horizontal strip. */
    horizontal?: boolean;
    /** Your translations of the drag's instructions and announcements. */
    messages?: Partial<DragMessages>;
  }>(),
  { horizontal: false, messages: undefined },
);

const emit = defineEmits<{ reorder: [items: string[]] }>();

const activeId = ref<string | null>(null);
const home = ref(true);
const draft = ref<string[]>([...props.items]);
const listRef = ref<HTMLElement | null>(null);
const lockedHeight = ref<number | null>(null);
const announcement = ref("");
const lastReorderPointer = ref<{ x: number; y: number } | null>(null);
const siblingTransition = useDragSiblingTransition();
const siblingStyle = computed(() => {
  const transition = siblingTransition.value;
  return transition
    ? { transition: `transform ${transition.duration}ms ${transition.easing}` }
    : undefined;
});

/** Each attachment registers its announcement label as it renders. */
const labels = reactive(new Map<string, string>());

const announcements = computed(() =>
  createDragAnnouncements(
    {
      name: (id) => labels.get(String(id)) ?? "",
      place: (id) => {
        const index = draft.value.indexOf(String(id));
        return index < 0 ? null : { place: "", position: index + 1, count: draft.value.length };
      },
    },
    props.messages,
  ),
);

const displayItems = computed(() => (activeId.value ? draft.value : props.items));
const sensors = useDragSensors();
const listClass = computed(() =>
  props.horizontal
    ? "contents"
    : "flex w-full min-w-0 flex-wrap content-start items-start gap-2 py-1.5",
);
const listStyle = computed(() =>
  lockedHeight.value != null ? { minHeight: `${lockedHeight.value}px` } : undefined,
);

provide(composerSortableContextKey, { activeId, home, labels });

function onDragStart(session: DragSession) {
  activeId.value = String(session.id);
  home.value = true;
  draft.value = [...props.items];
  lockedHeight.value = listRef.value?.getBoundingClientRect().height ?? null;
  lastReorderPointer.value = null;
  announcement.value = announcements.value.onDragStart({ activeId: String(session.id) }) ?? "";
}

function onDragOver(session: DragSession) {
  const over = session.over?.id == null ? null : String(session.over.id);
  home.value = !over || over === activeId.value;
  if (!activeId.value || !over || over === activeId.value) return;
  const from = draft.value.indexOf(activeId.value);
  const to = draft.value.indexOf(over);
  if (from < 0 || to < 0 || from === to) return;
  // Ignore collisions produced by our own reorder while the pointer has not moved.
  // Keyboard drags carry no pointer, so they always pass.
  if (!session.keyboard) {
    const last = lastReorderPointer.value;
    if (
      last &&
      Math.abs(session.pointer.x - last.x) <= 0.5 &&
      Math.abs(session.pointer.y - last.y) <= 0.5
    ) {
      return;
    }
    lastReorderPointer.value = { x: session.pointer.x, y: session.pointer.y };
  }
  const next = [...draft.value];
  const [moved] = next.splice(from, 1);
  if (moved !== undefined) next.splice(to, 0, moved);
  draft.value = next;
  announcement.value =
    announcements.value.onDragOver({ activeId: activeId.value, overId: over }) ?? "";
}

function onDragEnd(session: DragSession) {
  announcement.value =
    announcements.value.onDragEnd({
      activeId: activeId.value ?? "",
      overId: session.over?.id ?? null,
    }) ?? "";
  home.value = true;
  if (session.over || session.keyboard) emit("reorder", [...draft.value]);
}

function reset() {
  activeId.value = null;
  home.value = true;
  draft.value = [...props.items];
  lockedHeight.value = null;
  lastReorderPointer.value = null;
}

onBeforeUnmount(reset);
</script>

<template>
  <DragScope v-bind="{ sensors, onDragStart, onDragOver, onDragEnd, onDragCancel: reset }">
    <DragLiveRegion :message="announcement" />
    <div
      ref="listRef"
      data-slot="sortable-composer-attachments-list"
      :class="listClass"
      :style="listStyle"
    >
      <SortableComposerAttachment
        v-for="id in displayItems"
        :id="id"
        :key="id"
        :label="id"
        :class="activeId === id ? 'pointer-events-none' : undefined"
        :style="activeId === id ? undefined : siblingStyle"
      >
        <slot :id="id" :dragging="activeId === id" :home="activeId === id && home" />
      </SortableComposerAttachment>
    </div>
    <DragLift :container="container" class="rounded-control">
      <slot v-if="activeId" :id="activeId" :dragging="true" :home="home" />
    </DragLift>
  </DragScope>
</template>
