import { inject, provide, type InjectionKey } from "vue";
import type { DialogVariants } from "./dialog.variants";

const DIALOG_PROPS_KEY: InjectionKey<{
  size: () => NonNullable<DialogVariants["size"]>;
  bar: () => boolean;
}> = Symbol("raft-dialog-props");

export function provideDialogContext(
  size: () => NonNullable<DialogVariants["size"]>,
  bar: () => boolean,
) {
  provide(DIALOG_PROPS_KEY, { size, bar });
}

export function useDialogContext() {
  return inject(DIALOG_PROPS_KEY, { size: () => "md" as const, bar: () => false });
}
