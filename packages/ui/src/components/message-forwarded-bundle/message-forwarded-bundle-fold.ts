import { inject, type InjectionKey } from "vue";

export interface ForwardedBundleFold {
  readonly collapsed: boolean;
  readonly auto: boolean;
  readonly foldable: boolean;
  readonly foldLineLimit: number;
  toggle: () => void;
  reportFold: (foldable: boolean) => void;
}

export const forwardedBundleFoldKey: InjectionKey<ForwardedBundleFold> = Symbol(
  "raft-message-forwarded-bundle-fold",
);

export function useForwardedBundleFold() {
  return inject(forwardedBundleFoldKey, null);
}
