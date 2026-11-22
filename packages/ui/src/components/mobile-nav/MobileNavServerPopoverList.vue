<script setup lang="ts">
import ScrollArea from "../scroll-area/ScrollArea.vue";
import { scrollToElement } from "../scroll-area/scroll-to-element";
import { mobileNavServer } from "./mobile-nav-server.recipe";

defineOptions({ name: "RaftMobileNavServerPopoverList", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    openOnCurrent?: boolean;
    class?: string;
  }>(),
  { openOnCurrent: true },
);

const attrs = useAttrs();
let stop: (() => void) | undefined;

function resolveElement(value: unknown): HTMLElement | null {
  const isElement = (candidate: unknown): candidate is HTMLElement =>
    typeof HTMLElement !== "undefined" && candidate instanceof HTMLElement;
  if (isElement(value)) return value;
  const inner = (value as { $el?: unknown } | null)?.$el;
  return isElement(inner) ? inner : null;
}

function pinCurrentRow(list: HTMLElement) {
  let pinned = true;
  const show = () => {
    if (!pinned) return;
    const current = list.querySelector('[aria-current="true"]');
    if (!current) return;
    const offset = parseFloat(getComputedStyle(list).paddingBottom) || 0;
    scrollToElement(list, current as HTMLElement, "vertical", { block: "nearest", offset });
  };
  const release = () => {
    pinned = false;
  };
  const events = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
  for (const type of events) list.addEventListener(type, release, { passive: true });
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(show);
  resize?.observe(list);
  show();
  return () => {
    resize?.disconnect();
    for (const type of events) list.removeEventListener(type, release);
  };
}

const setArea = (value: unknown) => {
  stop?.();
  stop = undefined;
  if (!props.openOnCurrent) return;
  const element = resolveElement(value);
  if (element) stop = pinCurrentRow(element);
};

onBeforeUnmount(() => stop?.());
</script>

<template>
  <ScrollArea
    :ref="setArea"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="mobile-nav-server-popover-list"
    overscroll="contain"
    :tabindex="-1"
    :class="mobileNavServer().list({ class: props.class })"
  >
    <slot />
  </ScrollArea>
</template>
