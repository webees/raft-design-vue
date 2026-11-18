import { inject, provide, type InjectionKey } from "vue";

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

export function useDrawerConfig(): DrawerConfig {
  return (
    inject(DRAWER_CONFIG_KEY, {
      modal: true,
      swipeAxis: "x",
      swipeDirection: "right",
      hasSnapPoints: false,
      nested: false,
    }) ?? {
      modal: true,
      swipeAxis: "x",
      swipeDirection: "right",
      hasSnapPoints: false,
      nested: false,
    }
  );
}
