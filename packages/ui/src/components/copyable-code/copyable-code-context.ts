import { inject, provide, type InjectionKey, type Ref } from "vue";

export type CopyableCodeSize = "sm" | "md";

export type CopyableCodeContext = {
  copied: Ref<boolean>;
  copyValue: (value: string) => Promise<void>;
  size: Ref<CopyableCodeSize>;
};

const COPYABLE_CODE_KEY: InjectionKey<CopyableCodeContext> = Symbol("raft-copyable-code");

export function provideCopyableCode(context: CopyableCodeContext) {
  provide(COPYABLE_CODE_KEY, context);
}

export function useCopyableCode(part: string) {
  const context = inject(COPYABLE_CODE_KEY);
  if (!context) {
    throw new Error(`${part} must be used inside CopyableCodeRoot.`);
  }
  return context;
}
