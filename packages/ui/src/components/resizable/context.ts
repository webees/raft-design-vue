import type { InjectionKey, Ref } from "vue";
import type { ResizableOrientation } from "./resizable.variants";

export const RESIZABLE_ORIENTATION_KEY: InjectionKey<Ref<ResizableOrientation>> = Symbol(
  "raft-resizable-orientation",
);

export type { ResizableOrientation };
