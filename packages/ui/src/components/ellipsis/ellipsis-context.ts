import { inject, provide, type InjectionKey } from "vue";

export interface EllipsisContextValue {
  expanded: boolean;
  toggle: () => void;
  textId: string;
}

export const ellipsisKey: InjectionKey<EllipsisContextValue> = Symbol("raft-ellipsis");

export function provideEllipsis(value: EllipsisContextValue) {
  provide(ellipsisKey, value);
}

export function useEllipsisContext() {
  const context = inject(ellipsisKey, null);
  if (!context) throw new Error("EllipsisToggle must be inside an Ellipsis `after`.");
  return context;
}
