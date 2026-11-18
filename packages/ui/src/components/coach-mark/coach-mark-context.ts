import { inject, type ComputedRef, type InjectionKey, type Ref } from "vue";

export type CoachMarkContext = {
  anchor: ComputedRef<Element | null>;
  popupRef: Ref<HTMLElement | null>;
  nextRef: Ref<HTMLElement | null>;
  dismiss: () => void;
  registerNext: (element: HTMLElement) => void;
};

export const COACH_MARK_KEY: InjectionKey<CoachMarkContext> = Symbol("raft-coach-mark");

export function useCoachMarkContext(part: string) {
  const context = inject(COACH_MARK_KEY, null);
  if (!context) throw new Error(`RaftCoachMark${part} must be used within RaftCoachMark`);
  return context;
}
