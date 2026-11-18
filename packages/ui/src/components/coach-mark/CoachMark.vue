<script setup lang="ts">
import { PopoverRoot } from "reka-ui";

import { COACH_MARK_KEY, type CoachMarkContext } from "./coach-mark-context";
import { startCoachMarkStop } from "./coach-mark-stop";

defineOptions({ name: "RaftCoachMark" });

const props = withDefaults(
  defineProps<{
    anchor?: Element | { value: Element | null } | null;
    open?: boolean;
    defaultOpen?: boolean;
    onDismiss?: () => void;
  }>(),
  { anchor: null, open: undefined, defaultOpen: true, onDismiss: undefined },
);

const emit = defineEmits<{ "update:open": [open: boolean] }>();

const looseOpen = ref(props.defaultOpen);
const current = computed(() => props.open ?? looseOpen.value);
const popupRef = ref<HTMLElement | null>(null);
const nextRef = ref<HTMLElement | null>(null);

function anchorElement(anchor: Element | { value: Element | null } | null | undefined) {
  if (!anchor) return null;
  if (typeof Node !== "undefined" && anchor instanceof Node) return anchor as Element;
  return "value" in anchor ? anchor.value : anchor;
}

function dismiss() {
  if (props.open === undefined) looseOpen.value = false;
  emit("update:open", false);
  props.onDismiss?.();
}

const context: CoachMarkContext = {
  anchor: computed(() => anchorElement(props.anchor)),
  popupRef,
  nextRef,
  dismiss,
  registerNext: (element) => {
    nextRef.value = element;
  },
};
provide(COACH_MARK_KEY, context);

let stop: {
  anchor: Element | { value: Element | null } | null;
  target: Element;
  teardown: () => void;
} | null = null;

function syncStop() {
  const anchor = props.anchor;
  const target = current.value ? anchorElement(anchor) : null;
  if (stop && stop.anchor === anchor && stop.target === target) return;
  const opened = !stop || stop.anchor !== anchor;
  stop?.teardown();
  stop = target
    ? { anchor, target, teardown: startCoachMarkStop(target, popupRef, nextRef, opened) }
    : null;
}

watchEffect(syncStop);
onBeforeUnmount(() => {
  stop?.teardown();
  stop = null;
});
</script>

<template>
  <PopoverRoot :open="current" @update:open="(next) => (next ? undefined : dismiss())">
    <slot />
  </PopoverRoot>
</template>
