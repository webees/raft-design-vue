import {
  computed,
  getCurrentInstance,
  shallowRef,
  type ComputedRef,
  type WritableComputedRef,
} from "vue";

/** True once the caller passes `name` on the vnode, i.e. the state is controlled. */
export function useIsControlled(name: string): ComputedRef<boolean> {
  const instance = getCurrentInstance();
  return computed(() => instance?.vnode.props?.[name] !== undefined);
}

/**
 * Reka-style two-way state: keep a local value while the caller leaves `name`
 * unset on the vnode, and mirror the prop once it is controlled.
 */
export function useControlledState<T>(
  name: string,
  prop: () => T | undefined,
  fallback: T,
  emit: (value: T) => void,
): WritableComputedRef<T> {
  const controlled = useIsControlled(name);
  const local = shallowRef(fallback);
  return computed({
    get: () => (controlled.value ? (prop() as T) : local.value),
    set: (value: T) => {
      if (!controlled.value) local.value = value;
      emit(value);
    },
  });
}
