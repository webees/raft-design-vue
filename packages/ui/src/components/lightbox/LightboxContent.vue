<script setup lang="ts">
import { DialogContent, DialogOverlay } from "reka-ui";

import { toElement } from "../../lib/dom";
import LightboxPortal from "./LightboxPortal.vue";
import { lightbox } from "./lightbox.recipe";
import { useLightboxModal } from "./lightbox-context";
import { useParentOverlayKind } from "../../lib/overlay-depth";
import { PopupSheetReset } from "../../lib/popup-boundary";

defineOptions({ name: "RaftLightboxContent", inheritAttrs: false });

const props = defineProps<{
  class?: string;
  finalFocus?: boolean | HTMLElement | null;
  initialFocus?: boolean | HTMLElement | null;
}>();

const emit = defineEmits<{
  closeAutoFocus: [event: Event];
  escapeKeyDown: [event: KeyboardEvent];
  focusOutside: [event: Event];
  interactOutside: [event: Event];
  openAutoFocus: [event: Event];
  pointerDownOutside: [event: Event];
}>();

const attrs = useAttrs();
const modal = useLightboxModal();

const nested = computed(() => useParentOverlayKind() !== null);
const documentMode = computed(() => modal.value === "trap-focus");

const contentRef = ref<HTMLElement | null>(null);
const classes = computed(() => lightbox({ nested: nested.value }).content({ class: props.class }));
const backdropClasses = computed(() => lightbox({ nested: nested.value }).backdrop());

const LINE_STEP = 40;
const PAGE_FRACTION = 0.875;

function takesKey(element: Element, key: string) {
  if (element instanceof HTMLElement && element.isContentEditable) return true;
  if (element.closest("input, textarea, select")) return true;
  return key === " " && element.closest('button, summary, [role="button"]') !== null;
}

function inScroller(target: Element | null, popup: Element) {
  let node = target;
  while (node && node !== popup) {
    const style = getComputedStyle(node as HTMLElement);
    const element = node as HTMLElement;
    if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight)
      return true;
    if (/(auto|scroll)/.test(style.overflowX) && element.scrollWidth > element.clientWidth)
      return true;
    node = node.parentElement;
  }
  return false;
}

function onKeyDown(event: KeyboardEvent) {
  if (!documentMode.value) return;
  const popup =
    contentRef.value instanceof HTMLElement ? contentRef.value : toElement(contentRef.value);
  const target = event.target as Element | null;
  if (!popup || event.defaultPrevented || !target || !popup.contains(target)) return;
  if (takesKey(target, event.key) || inScroller(target, popup)) return;

  const body = popup.querySelector<HTMLElement>('[data-slot="lightbox-body"]');
  const to = scrollKeyTarget(event, body ?? popup);
  if (!to) return;
  event.preventDefault();
  (body ?? popup).scrollTo(to);
}

function scrollKeyTarget(event: KeyboardEvent, scroller: HTMLElement) {
  const { altKey, ctrlKey, key, metaKey, shiftKey } = event;
  if (altKey) return null;
  const left = scroller.scrollLeft;
  const top = scroller.scrollTop;
  const page = scroller.clientHeight * PAGE_FRACTION;
  if (ctrlKey || metaKey) {
    if (key === "ArrowUp" || key === "Home") return { left, top: 0 };
    if (key === "ArrowDown" || key === "End") return { left, top: scroller.scrollHeight };
    return null;
  }
  switch (key) {
    case "ArrowUp":
      return { left, top: top - LINE_STEP };
    case "ArrowDown":
      return { left, top: top + LINE_STEP };
    case "ArrowLeft":
      return { left: left - LINE_STEP, top };
    case "ArrowRight":
      return { left: left + LINE_STEP, top };
    case "PageUp":
      return { left, top: top - page };
    case "PageDown":
      return { left, top: top + page };
    case " ":
      return { left, top: shiftKey ? top - page : top + page };
    case "Home":
      return { left, top: 0 };
    case "End":
      return { left, top: scroller.scrollHeight };
    default:
      return null;
  }
}

function onOpenAutoFocus(event: Event) {
  emit("openAutoFocus", event);
  if (event.defaultPrevented) return;
  const initial = props.initialFocus ?? (documentMode.value ? "auto" : false);
  if (initial === false) {
    event.preventDefault();
    return;
  }
  if (initial instanceof HTMLElement) {
    event.preventDefault();
    initial.focus();
    return;
  }
  requestAnimationFrame(() => {
    const popup =
      contentRef.value instanceof HTMLElement ? contentRef.value : toElement(contentRef.value);
    const body = popup?.querySelector<HTMLElement>('[data-slot="lightbox-body"]');
    if (!body) return;
    body.focus({ preventScroll: true });
  });
}

function onCloseAutoFocus(event: Event) {
  emit("closeAutoFocus", event);
  if (event.defaultPrevented) return;
  const final = props.finalFocus ?? documentMode.value;
  if (final === false) {
    event.preventDefault();
    return;
  }
  if (final instanceof HTMLElement) {
    event.preventDefault();
    final.focus();
  }
}
</script>

<template>
  <LightboxPortal>
    <DialogOverlay
      data-slot="lightbox-backdrop"
      :data-nested="nested ? '' : undefined"
      force-mount
      :class="backdropClasses"
    />
    <DialogContent
      ref="contentRef"
      data-slot="lightbox-content"
      v-bind="attrs"
      :class="classes"
      :trap-focus="modal !== false"
      :disable-outside-pointer-events="modal !== false"
      @keydown="onKeyDown"
      @open-auto-focus="onOpenAutoFocus"
      @close-auto-focus="onCloseAutoFocus"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
    >
      <PopupSheetReset>
        <slot />
      </PopupSheetReset>
    </DialogContent>
  </LightboxPortal>
</template>
