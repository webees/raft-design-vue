import { onBeforeUnmount, ref, watch, type Ref } from "vue";

/**
 * What is visible while the on-screen keyboard is up: the visual viewport's
 * top and height, and the window's height under it, in whole px.
 */
export type SoftKeyboardViewport = {
  /** px from the layout viewport's top to the visible area's top. */
  top: number;
  /** px of the visible area, above the keyboard. */
  height: number;
  /** px of the layout viewport (`innerHeight`), which the keyboard doesn't shrink. */
  windowHeight: number;
};

/** The keyboard takes more than this; a browser's toolbars take less. */
const KEYBOARD_MIN_PX = 100;

const NOT_TYPED = new Set([
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
]);

function isTextEditable(element: Element | null) {
  if (element instanceof HTMLTextAreaElement) return true;
  if (element instanceof HTMLInputElement) return !NOT_TYPED.has(element.type);
  return element instanceof HTMLElement && element.isContentEditable;
}

/**
 * The visible area while the on-screen keyboard is up, `null` while it is
 * down, and always `null` while `active` is false and on the server. The
 * keyboard counts as up when something typed into has focus and the visual
 * viewport is more than 100px shorter than the window. It measures at most
 * once a frame, on the visual viewport's resize/scroll and on focus changes.
 */
export function useSoftKeyboard(active: Ref<boolean> | boolean): Ref<SoftKeyboardViewport | null> {
  const keyboard = ref<SoftKeyboardViewport | null>(null);
  const isActive = typeof active === "boolean" ? ref(active) : active;
  let frame = 0;
  let viewport: VisualViewport | null = null;

  const update = () => {
    if (typeof window === "undefined") return;
    const windowHeight = window.innerHeight;
    const height = viewport?.height ?? windowHeight;
    const up = windowHeight - height > KEYBOARD_MIN_PX && isTextEditable(document.activeElement);
    const next = up
      ? {
          top: Math.round(Math.max(viewport?.offsetTop ?? 0, 0)),
          height: Math.round(height),
          windowHeight: Math.round(windowHeight),
        }
      : null;
    const previous = keyboard.value;
    if (
      previous &&
      next &&
      previous.top === next.top &&
      previous.height === next.height &&
      previous.windowHeight === next.windowHeight
    ) {
      return;
    }
    keyboard.value = next;
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      update();
    });
  };

  const attach = () => {
    if (typeof window === "undefined") return;
    viewport = window.visualViewport ?? null;
    if (!viewport) return;
    schedule();
    viewport.addEventListener("resize", schedule);
    viewport.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("focusin", schedule);
    document.addEventListener("focusout", schedule);
  };

  const detach = () => {
    if (typeof window === "undefined") return;
    cancelAnimationFrame(frame);
    frame = 0;
    viewport?.removeEventListener("resize", schedule);
    viewport?.removeEventListener("scroll", schedule);
    document.removeEventListener("focusin", schedule);
    document.removeEventListener("focusout", schedule);
    viewport = null;
    keyboard.value = null;
  };

  watch(
    isActive,
    (on) => {
      detach();
      if (on) attach();
    },
    { immediate: true },
  );
  onBeforeUnmount(detach);

  return keyboard;
}
