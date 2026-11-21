import { inject, provide, type InjectionKey } from "vue";

import type { DragEngine, DragId, DragLifecycleProps } from "../../lib/drag-engine";
import type { DragAnnouncementSource, DragMessages } from "../drag/drag-announcements";

export type TaskDropState = "idle" | "allowed" | "blocked";
export type TaskDropPlacement = "before" | "after";
export type TaskDropData = Record<string, unknown>;
export type TaskDropZoneState = { dropState: TaskDropState };
export type TaskDndAccessibility = {
  announcements?: Partial<DragMessages>;
  screenReaderInstructions?: { draggable: string };
};

export type TaskMoveDetails = {
  activeId: DragId;
  overData: TaskDropData | undefined;
  overId: DragId;
  placement: TaskDropPlacement | null;
};

export interface TaskDndContextValue {
  activeDropId: () => DragId | null;
  activeHeight: () => number | null;
  activeId: () => DragId | null;
  engine: DragEngine;
  isDropAllowed: (activeId: DragId, overId: DragId, overData: TaskDropData | undefined) => boolean;
  overlay: () => boolean;
  setOverlay: (value: boolean) => void;
  over: () => {
    overId: DragId | null;
    overPlacement: TaskDropPlacement | null;
    overData?: TaskDropData;
  };
}

export type TaskDndProviderProps = DragLifecycleProps & {
  accessibility?: unknown;
  describe?: DragAnnouncementSource;
  disabled?: boolean;
  isDropAllowed?: (activeId: DragId, overId: DragId, overData: TaskDropData | undefined) => boolean;
  messages?: Partial<DragMessages>;
  onMove?: (details: TaskMoveDetails) => void | Promise<void>;
  onMoveError?: (error: unknown, details: TaskMoveDetails) => void;
};

const TASK_DND_KEY: InjectionKey<TaskDndContextValue> = Symbol("raft-task-dnd");

export function provideTaskDnd(context: TaskDndContextValue) {
  provide(TASK_DND_KEY, context);
}

export function useTaskDnd(): TaskDndContextValue | null {
  return inject(TASK_DND_KEY, null);
}

/**
 * Resolves the `allowed` / `blocked` / `idle` state a drop target shows.
 * `placement` narrows the match to one edge; `data` overrides the payload
 * handed to `isDropAllowed` when the target owns its own drop data.
 */
export function useTaskDropState(
  id: () => string | number,
  {
    placement,
    data,
  }: {
    placement?: () => TaskDropPlacement | undefined;
    data?: () => TaskDropData | undefined;
  } = {},
) {
  const context = useTaskDnd();
  return computed<TaskDropState>(() => {
    const active = context?.activeId();
    const over = context?.over();
    if (!context || active == null || over?.overId !== id()) return "idle";
    const edge = placement?.();
    if (edge && over.overPlacement !== edge) return "idle";
    return context.isDropAllowed(active, id(), data ? data() : over.overData)
      ? "allowed"
      : "blocked";
  });
}

export function allowTaskDrop() {
  return true;
}
