<script setup lang="ts">
import { messageItem } from "./message-item.recipe";

defineOptions({ name: "RaftMessageItemToolbar", inheritAttrs: false });

const props = defineProps<{ class?: string }>();
const attrs = useAttrs();
const el = ref<HTMLElement | null>(null);

const TOOLBAR_WIDTH = "--mi-toolbar-width";
const FALLBACK_WIDTH = "164px";

const watched = new Map<HTMLElement, HTMLElement>();
let resizeObserver: ResizeObserver | null = null;

function writeWidth(toolbar: HTMLElement, row: HTMLElement) {
  row.style.setProperty(TOOLBAR_WIDTH, `${toolbar.offsetWidth}px`);
}

function hasOpenPopup(row: HTMLElement) {
  return row.hasAttribute("data-popup-open") || row.querySelector("[data-popup-open]") !== null;
}

function resized(entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const target = entry.target as HTMLElement;
    const row = watched.get(target);
    if (row) writeWidth(target, row);
  }
}

function unwatch(toolbar: HTMLElement) {
  if (!watched.delete(toolbar)) return;
  resizeObserver?.unobserve(toolbar);
  if (watched.size > 0) return;
  resizeObserver?.disconnect();
  resizeObserver = null;
}

function watch(toolbar: HTMLElement, row: HTMLElement) {
  if (watched.has(toolbar)) return;
  writeWidth(toolbar, row);
  if (typeof ResizeObserver === "undefined") return;
  for (const [other, otherRow] of watched) {
    if (!otherRow.matches(":hover, :focus-within") && !hasOpenPopup(otherRow)) unwatch(other);
  }
  resizeObserver ??= new ResizeObserver(resized);
  watched.set(toolbar, row);
  resizeObserver.observe(toolbar);
}

function measureWidthOnShow(toolbar: HTMLElement) {
  const row = toolbar.closest<HTMLElement>("[data-message-item]");
  if (!row) return undefined;

  const show = () => watch(toolbar, row);
  const pointerLeft = () => {
    if (!row.matches(":focus-within") && !hasOpenPopup(row)) unwatch(toolbar);
  };
  const focusLeft = (event: FocusEvent) => {
    const next = event.relatedTarget instanceof Node ? event.relatedTarget : null;
    if (row.contains(next) || row.matches(":hover") || hasOpenPopup(row)) return;
    unwatch(toolbar);
  };

  row.style.setProperty(TOOLBAR_WIDTH, FALLBACK_WIDTH);
  row.addEventListener("pointerenter", show);
  row.addEventListener("focusin", show);
  row.addEventListener("pointerleave", pointerLeft);
  row.addEventListener("focusout", focusLeft);

  return () => {
    row.removeEventListener("pointerenter", show);
    row.removeEventListener("focusin", show);
    row.removeEventListener("pointerleave", pointerLeft);
    row.removeEventListener("focusout", focusLeft);
    unwatch(toolbar);
    row.style.removeProperty(TOOLBAR_WIDTH);
  };
}

let cleanup: (() => void) | undefined;

onMounted(() => {
  if (el.value) cleanup = measureWidthOnShow(el.value);
});

onBeforeUnmount(() => {
  cleanup?.();
  cleanup = undefined;
});

const classes = computed(() => messageItem().toolbar({ className: props.class }));
</script>

<template>
  <div v-bind="attrs" ref="el" data-slot="message-item-toolbar" :class="classes">
    <slot />
  </div>
</template>
