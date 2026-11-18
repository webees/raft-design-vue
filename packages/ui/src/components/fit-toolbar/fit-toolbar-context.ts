import { inject, provide, type InjectionKey, type VNode } from "vue";

export type FitStep = "label" | "more" | "collapse" | "wrap" | "plus";
export type FitSteps = Partial<Record<FitStep, number>>;

export interface FitItemRegistration {
  id: string;
  steps: FitSteps;
  moreItem?: VNode;
  element: HTMLElement | null;
}

export interface FitToolbarContext {
  register: (item: FitItemRegistration) => void;
  unregister: (id: string) => void;
  /** The item's registration changes (its `moreItem` did). */
  touch: (id: string) => void;
  taken: (id: string, step: FitStep) => boolean;
  more: () => VNode[];
  moreShown: () => boolean;
  requestMeasure: () => void;
}

export const fitToolbarKey: InjectionKey<FitToolbarContext> = Symbol("raft-fit-toolbar");

export function provideFitToolbar(value: FitToolbarContext) {
  provide(fitToolbarKey, value);
}

export function useFitToolbar() {
  const context = inject(fitToolbarKey, null);
  if (!context) throw new Error("useFitItem must be used inside a FitToolbar.");
  return context;
}

export function useInFitToolbar() {
  return inject(fitToolbarKey, null) !== null;
}
