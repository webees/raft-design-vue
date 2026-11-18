<script setup lang="ts">
import { createDragEngine, type DragSession } from "../../lib/drag-engine";
import { createDragAnnouncements, SILENT_DRAG_ANNOUNCEMENTS } from "../drag/drag-announcements";
import {
  provideTaskDnd,
  allowTaskDrop,
  type TaskDndProviderProps,
  type TaskDropData,
} from "./task-dnd-context";

defineOptions({ name: "RaftTaskDndProvider", inheritAttrs: false });

const props = withDefaults(defineProps<TaskDndProviderProps>(), {
  disabled: false,
  isDropAllowed: allowTaskDrop,
});

const activeId = ref<string | number | null>(null);
const activeDropId = ref<string | number | null>(null);
const activeHeight = ref<number | null>(null);
const overlay = ref(false);
const over = ref<{
  overId: string | number | null;
  overPlacement: "before" | "after" | null;
  overData?: TaskDropData;
}>({
  overId: null,
  overPlacement: null,
});

const announcements = computed(() =>
  props.describe
    ? createDragAnnouncements(props.describe, props.messages)
    : SILENT_DRAG_ANNOUNCEMENTS,
);

function ownDropId(session: DragSession) {
  return (session.data.dropId as string | number | undefined) ?? null;
}

function reset() {
  activeId.value = null;
  activeDropId.value = null;
  activeHeight.value = null;
  over.value = { overId: null, overPlacement: null };
}

const engine = createDragEngine({
  disabled: () => props.disabled,
  onDragStart: (session) => {
    activeId.value = session.id;
    activeDropId.value = ownDropId(session);
    activeHeight.value = session.rect.height;
    engine.announce(announcements.value.onDragStart({ activeId: session.id }) ?? "");
    props.onDragStart?.(session);
  },
  onDragMove: (session) => {
    over.value = {
      ...over.value,
      overPlacement: session.over?.placement ?? null,
    };
    props.onDragMove?.(session);
  },
  onDragOver: (session) => {
    over.value = {
      overId: session.over?.id ?? null,
      overPlacement: session.over?.placement ?? null,
      overData: session.over?.data,
    };
    engine.announce(
      announcements.value.onDragOver({
        activeId: session.id,
        overId: session.over?.id ?? null,
      }) ?? "",
    );
    props.onDragOver?.(session);
  },
  onDragEnd: (session) => {
    const nextOverId = session.over?.id ?? null;
    const nextOverData = session.over?.data as TaskDropData | undefined;
    const own = ownDropId(session);
    if (
      nextOverId != null &&
      nextOverId !== own &&
      props.isDropAllowed(session.id, nextOverId, nextOverData)
    ) {
      const details = {
        activeId: session.id,
        overData: nextOverData,
        overId: nextOverId,
        placement: session.over?.placement ?? null,
      };
      void Promise.resolve(props.onMove?.(details)).catch((error: unknown) => {
        props.onMoveError?.(error, details);
      });
    }
    engine.announce(
      announcements.value.onDragEnd({ activeId: session.id, overId: nextOverId }) ?? "",
    );
    reset();
    props.onDragEnd?.(session, "drop");
  },
  onDragCancel: (session) => {
    engine.announce(announcements.value.onDragCancel({ activeId: session.id }) ?? "");
    reset();
    props.onDragCancel?.(session);
  },
});

provideTaskDnd({
  activeDropId: () => activeDropId.value,
  activeHeight: () => activeHeight.value,
  activeId: () => activeId.value,
  engine,
  isDropAllowed: props.isDropAllowed,
  over: () => over.value,
  overlay: () => overlay.value,
  setOverlay: (value: boolean) => {
    overlay.value = value;
  },
});
</script>

<template>
  <slot />
</template>
