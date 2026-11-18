import { inject, provide, type InjectionKey } from "vue";
import type { PopoverSize } from "./popover.variants";

const POPOVER_SIZE_KEY: InjectionKey<{ size: () => PopoverSize }> = Symbol("raft-popover-size");

export function providePopoverSize(size: () => PopoverSize) {
  provide(POPOVER_SIZE_KEY, { size });
}

export function usePopoverSize() {
  return inject(POPOVER_SIZE_KEY, { size: () => "default" as PopoverSize });
}
