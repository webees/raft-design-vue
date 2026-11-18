import { inject, provide, type InjectionKey, type Ref } from "vue";

const ICONS_ONLY_KEY: InjectionKey<Ref<boolean>> = Symbol("raft-segmented-control-icons-only");

export function provideSegmentedControlIconsOnly(value: Ref<boolean>) {
  provide(ICONS_ONLY_KEY, value);
}

export function useSegmentedControlIconsOnly() {
  return inject(ICONS_ONLY_KEY, null);
}

const TOOLBAR_STOP_KEY: InjectionKey<Ref<boolean | undefined>> = Symbol(
  "raft-segmented-control-toolbar-stop",
);

export function provideSegmentedControlToolbarStop(value: Ref<boolean | undefined>) {
  provide(TOOLBAR_STOP_KEY, value);
}

export function useSegmentedControlToolbarStop() {
  return inject(TOOLBAR_STOP_KEY, null);
}
