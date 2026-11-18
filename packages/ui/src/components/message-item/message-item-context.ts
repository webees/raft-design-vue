import { computed, inject, onBeforeUnmount, provide, ref, useId, watch, type InjectionKey, type Ref } from "vue";

export type MessageItemLabelPart = "sender" | "time";

export interface MessageItemLabelRegistry {
  register: (part: MessageItemLabelPart, id: string) => () => void;
  sync: () => void;
}

export const MESSAGE_ITEM_LABEL: InjectionKey<MessageItemLabelRegistry> =
  Symbol("MessageItemLabel");

export function provideMessageItemLabels(
  register: MessageItemLabelRegistry["register"],
  sync: () => void,
) {
  provide(MESSAGE_ITEM_LABEL, { register, sync });
}

export function useMessageItemLabelId(
  part: MessageItemLabelPart,
  id: Ref<string | undefined>,
): Ref<string | undefined> {
  const registry = inject(MESSAGE_ITEM_LABEL, null);
  const generatedId = useGeneratedId(`message-item-${part}`);
  const labelId = computed(() => id.value ?? (registry ? generatedId.value : undefined));
  let cleanup: (() => void) | undefined;
  const stop = () => {
    cleanup?.();
    cleanup = undefined;
  };
  const watchId = () => {
    stop();
    if (!registry || !labelId.value) return;
    cleanup = registry.register(part, labelId.value);
    registry.sync();
  };
  watchId();
  watch(labelId, watchId);
  onBeforeUnmount(stop);
  return labelId;
}

export function useGeneratedId(prefix: string) {
  const id = useId();
  return ref(`${prefix}-${id.replaceAll(":", "")}`);
}
