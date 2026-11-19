import { inject, provide, type InjectionKey } from "vue";
import { onBeforeUnmount, onMounted, ref } from "vue";

import { toElement } from "../../lib/dom";
import type { DragEngine } from "../../lib/drag-engine";

export const DRAG_ENGINE_KEY: InjectionKey<DragEngine> = Symbol("raft-drag-engine");

export function provideDragEngine(engine: DragEngine) {
  provide(DRAG_ENGINE_KEY, engine);
}

export function useDragEngine(): DragEngine | null {
  return inject(DRAG_ENGINE_KEY, null);
}

/** Binds an element to the engine for its lifetime. */
export function useDragElement(register: (engine: DragEngine, element: HTMLElement) => () => void) {
  const engine = useDragEngine();
  const root = ref<HTMLElement | null>(null);
  let unregister: (() => void) | null = null;

  onMounted(() => {
    const element = toElement<HTMLElement>(root.value);
    if (element && engine) unregister = register(engine, element);
  });
  onBeforeUnmount(() => unregister?.());

  return { engine, root };
}
