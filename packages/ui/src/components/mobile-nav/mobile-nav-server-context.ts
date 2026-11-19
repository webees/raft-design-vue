import { inject, provide, type InjectionKey, type Ref } from "vue";

export interface MobileNavServerContextValue {
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  triggerRef: Ref<HTMLElement | null>;
}

const MOBILE_NAV_SERVER_KEY: InjectionKey<MobileNavServerContextValue> =
  Symbol("raft-mobile-nav-server");

export function provideMobileNavServer(value: MobileNavServerContextValue) {
  provide(MOBILE_NAV_SERVER_KEY, value);
}

export function useMobileNavServer(): MobileNavServerContextValue | null {
  return inject(MOBILE_NAV_SERVER_KEY, null);
}
