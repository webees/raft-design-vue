import { inject, provide, ref, type Ref } from "vue";

interface ProgressContext {
  indeterminate: Ref<boolean>;
}

const key = Symbol("raft-progress");

export function provideProgress(indeterminate: Ref<boolean>) {
  provide(key, { indeterminate });
}

export function useProgress(): ProgressContext {
  return inject(key, () => ({ indeterminate: ref(false) }), true);
}
