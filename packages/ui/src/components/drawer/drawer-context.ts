import { computed, inject, provide, type InjectionKey } from "vue";

import { drawer } from "./drawer.recipe";

export interface DrawerConfig {
  readonly modal: boolean;
  readonly swipeAxis: "x" | "y";
  readonly swipeDirection: "up" | "down" | "left" | "right";
  readonly hasSnapPoints: boolean;
  readonly nested: boolean;
}

const DRAWER_CONFIG_KEY: InjectionKey<DrawerConfig> = Symbol("raft-drawer-config");

export function provideDrawerConfig(config: DrawerConfig) {
  provide(DRAWER_CONFIG_KEY, config);
}

const DEFAULT_DRAWER_CONFIG: DrawerConfig = {
  modal: true,
  swipeAxis: "x",
  swipeDirection: "right",
  hasSnapPoints: false,
  nested: false,
};

export function useDrawerConfig(): DrawerConfig {
  return inject(DRAWER_CONFIG_KEY, DEFAULT_DRAWER_CONFIG);
}

export function useDrawerRecipe() {
  const config = useDrawerConfig();
  return computed(() =>
    drawer({
      axis: config.swipeAxis,
      side: config.swipeDirection,
      snapPoints: config.hasSnapPoints,
      nested: config.nested,
    }),
  );
}
