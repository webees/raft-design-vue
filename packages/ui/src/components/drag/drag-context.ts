import { inject, provide, type InjectionKey } from "vue";

import type { DragEngine } from "../../lib/drag-engine";

export const DRAG_ENGINE_KEY: InjectionKey<DragEngine> = Symbol("raft-drag-engine");

export function provideDragEngine(engine: DragEngine) {
  provide(DRAG_ENGINE_KEY, engine);
}

export function useDragEngine(): DragEngine | null {
  return inject(DRAG_ENGINE_KEY, null);
}
