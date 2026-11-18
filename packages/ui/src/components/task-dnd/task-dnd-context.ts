import { inject, provide, type InjectionKey } from "vue";

import type { DragEngine, DragId, DragSession } from "../../lib/drag-engine";
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
  isDropAllowed: (
    activeId: DragId,
    overId: DragId,
    overData: TaskDropData | undefined,
  ) => boolean;
  overlay: () => boolean;
  setOverlay: (value: boolean) => void;
  over: () => { overId: DragId | null; overPlacement: TaskDropPlacement | null; overData?: TaskDropData };
}

export type TaskDndProviderProps = {
  accessibility?: unknown;
  describe?: DragAnnouncementSource;
  disabled?: boolean;
  isDropAllowed?: (
    activeId: DragId,
    overId: DragId,
    overData: TaskDropData | undefined,
  ) => boolean;
  messages?: Partial<DragMessages>;
  onDragCancel?: (session: DragSession) => void;
  onDragEnd?: (session: DragSession, reason: "drop" | "cancel") => void;
  onDragMove?: (session: DragSession) => void;
  onDragOver?: (session: DragSession) => void;
  onDragStart?: (session: DragSession) => void;
  onMove?: (details: TaskMoveDetails) => void | Promise<void>;
  onMoveError?: (error: unknown, details: TaskMoveDetails) => void;
};

export const TASK_DND_KEY: InjectionKey<TaskDndContextValue> = Symbol("raft-task-dnd");

export function provideTaskDnd(context: TaskDndContextValue) {
  provide(TASK_DND_KEY, context);
}

export function useTaskDnd(): TaskDndContextValue | null {
  return inject(TASK_DND_KEY, null);
}

export function allowTaskDrop() {
  return true;
}
