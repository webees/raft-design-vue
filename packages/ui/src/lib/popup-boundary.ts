import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  toValue,
  type InjectionKey,
  type MaybeRefOrGetter,
} from "vue";

/** A collision boundary as a rect in window coordinates, as floating-ui takes it. */
export type PopupBoundaryRect = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

type MaybeElement = Element | null | undefined;

/** WebKit, by floating-ui's own test (`isWebKit` in @floating-ui/utils). */
function isWebKit() {
  return typeof CSS !== "undefined" && CSS.supports?.("-webkit-backdrop-filter", "none") === true;
}

const NOT_NONE = (value: string | undefined) => !!value && value !== "none";
const WILL_CHANGE = /transform|translate|scale|rotate|perspective|filter/;
const CONTAIN = /paint|layout|strict|content/;

function offsetParentIsWindow(popup: MaybeElement): boolean {
  if (!popup) return true;
  if (getComputedStyle(popup).position !== "fixed") return false;
  for (let node = popup.parentElement; node; node = node.parentElement) {
    const css = getComputedStyle(node);
    if (
      NOT_NONE(css.transform) ||
      NOT_NONE(css.translate) ||
      NOT_NONE(css.scale) ||
      NOT_NONE(css.rotate) ||
      NOT_NONE(css.perspective) ||
      WILL_CHANGE.test(css.willChange || "") ||
      CONTAIN.test(css.contain || "")
    ) {
      return false;
    }
  }
  return true;
}

/**
 * How far to move a boundary rect so floating-ui reads it where the window
 * draws it (WebKit's visual viewport offset; twice for a fixed popup whose
 * offset parent is the window).
 */
export function visualViewportShift(popup?: MaybeElement): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  const viewport = window.visualViewport;
  if (!viewport || !isWebKit()) return { x: 0, y: 0 };
  if (viewport.offsetLeft === 0 && viewport.offsetTop === 0) return { x: 0, y: 0 };
  const times = offsetParentIsWindow(popup) ? 2 : 1;
  return { x: times * viewport.offsetLeft, y: times * viewport.offsetTop };
}

export type PopupVirtualAnchor = {
  getBoundingClientRect: () => {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
  };
};

export type PopupAnchor =
  | Element
  | PopupVirtualAnchor
  | { readonly current: Element | null }
  | (() => Element | PopupVirtualAnchor | null)
  | null
  | undefined;

const isElement = (value: object): value is Element =>
  typeof (value as Element).nodeType === "number";

/** The element or virtual element an `anchor` prop stands for now, or `null`. */
export function resolvePopupAnchor(anchor: PopupAnchor): Element | PopupVirtualAnchor | null {
  const value = typeof anchor === "function" ? anchor() : anchor;
  if (!value) return null;
  if (!isElement(value) && "current" in value) return value.current;
  return value;
}

/**
 * The element an open popup is anchored to, found from its positioner. Reka
 * keeps the relation in its own state, so this reads the DOM: the open trigger
 * (`data-popup-open`/`data-state=open`) whose `aria-controls` names an element
 * inside the positioner, or the one open tooltip/preview-card trigger.
 */
export function findPopupAnchor(positioner: MaybeElement): Element | null {
  if (!positioner) return null;
  const root = positioner.ownerDocument;
  for (const trigger of root.querySelectorAll<HTMLElement>(
    "[data-popup-open][aria-controls], [data-state=open][aria-controls]",
  )) {
    const controlled = root.getElementById(trigger.getAttribute("aria-controls") ?? "");
    if (controlled && positioner.contains(controlled)) return trigger;
  }
  const unnamed = positioner.querySelector('[data-slot="tooltip-content"]')
    ? "[data-slot=tooltip-trigger][data-state=open], [data-base-ui-tooltip-trigger][data-popup-open]"
    : positioner.querySelector('[data-slot="preview-card-content"]')
      ? "[data-slot=preview-card-trigger][data-state=open], [data-slot=preview-card-trigger][data-popup-open]"
      : null;
  if (!unnamed) return null;
  const open = root.querySelectorAll<HTMLElement>(unnamed);
  return open.length === 1 ? open[0]! : null;
}

/** A sheet, for the popups opened in it: its head and surface, read at each placement. */
export type PopupSheet = {
  head: () => MaybeElement;
  surface: () => MaybeElement;
};

const PopupSheetKey: InjectionKey<PopupSheet | undefined> = Symbol("RaftPopupSheet");

export function providePopupSheet(sheet: PopupSheet | undefined) {
  provide(PopupSheetKey, sheet);
}

export function usePopupSheet() {
  return inject(PopupSheetKey, undefined);
}

/** A dialog's own content resets the enclosing sheet for its children. */
export const PopupSheetReset = defineComponent({
  name: "RaftPopupSheetReset",
  setup(_, { slots }) {
    providePopupSheet(undefined);
    return () => slots.default?.();
  },
});

/**
 * The part of a sheet a popup opened in it may cover: from the bottom of the
 * sheet's head to the bottom of what is visible of the sheet, the window's
 * full width. A popup anchored inside the head is left unbounded.
 *
 * Floating-ui reads the rect's fields one after the other, so they are getters:
 * each placement sees the sheet as it is then (keyboard up, sheet resized).
 */
export function sheetPopupBoundary(
  sheet: PopupSheet,
  popup: () => MaybeElement = () => null,
  anchor: () => PopupAnchor = () => undefined,
): PopupBoundaryRect | null {
  let measured: { value: { top: number; height: number } | null } | null = null;

  const measure = () => {
    const head = sheet.head();
    const headBox = head?.getBoundingClientRect();
    const surfaceBox = sheet.surface()?.getBoundingClientRect();
    if (!head || !headBox || !surfaceBox) return null;
    const viewport = window.visualViewport;
    const top = headBox.bottom;
    const bottom = viewport
      ? Math.min(surfaceBox.bottom, viewport.offsetTop + viewport.height)
      : surfaceBox.bottom;
    if (bottom <= top) return null;
    const positioner = popup();
    const target = resolvePopupAnchor(anchor()) ?? findPopupAnchor(positioner);
    if (target) {
      if (isElement(target)) {
        if (head.contains(target)) return null;
      } else {
        const anchorBox = target.getBoundingClientRect();
        const x = (anchorBox.left + anchorBox.right) / 2;
        const y = (anchorBox.top + anchorBox.bottom) / 2;
        if (x >= headBox.left && x <= headBox.right && y >= headBox.top && y <= headBox.bottom) {
          return null;
        }
      }
    }
    return { top: top + visualViewportShift(positioner).y, height: bottom - top };
  };

  const read = () => {
    if (!measured) {
      measured = { value: measure() };
      queueMicrotask(() => {
        measured = null;
      });
    }
    return measured.value;
  };

  const initial = measure();
  if (!initial) return null;

  return {
    get x() {
      return 0;
    },
    get y() {
      return read()?.top ?? initial.top;
    },
    get width() {
      return typeof window === "undefined" ? 0 : window.innerWidth;
    },
    get height() {
      return read()?.height ?? initial.height;
    },
  };
}

/**
 * The rect a popup inside a `SheetPopupBoundary` should use as its collision
 * boundary, or `undefined` outside a sheet. Pass the positioner's ref so an
 * anchor in the sheet's head can be recognised.
 */
export function useSheetPopupBoundary(
  positioner?: MaybeRefOrGetter<Element | null | undefined>,
  anchor?: MaybeRefOrGetter<PopupAnchor>,
) {
  const sheet = usePopupSheet();
  const tick = ref(0);
  if (typeof window !== "undefined") {
    const bump = () => tick.value++;
    onMounted(() => {
      window.addEventListener("resize", bump);
      window.visualViewport?.addEventListener("resize", bump);
      window.visualViewport?.addEventListener("scroll", bump);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", bump);
      window.visualViewport?.removeEventListener("resize", bump);
      window.visualViewport?.removeEventListener("scroll", bump);
    });
  }
  return computed<PopupBoundaryRect | undefined>(() => {
    void tick.value;
    if (!sheet) return undefined;
    const rect = sheetPopupBoundary(
      sheet,
      () => toValue(positioner) ?? null,
      () => toValue(anchor),
    );
    return rect && rect.height > 0 ? rect : undefined;
  });
}

/** Renders no element; gives every popup opened under it the sheet's boundary. */
export const SheetPopupBoundary = defineComponent({
  name: "RaftSheetPopupBoundary",
  props: {
    head: { type: [Object, Function], required: true },
    surface: { type: [Object, Function], default: undefined },
  },
  setup(props, { slots }) {
    const head = () => props.head as unknown as MaybeRefOrGetter<Element | null | undefined>;
    const surface = () => props.surface as unknown as MaybeRefOrGetter<Element | null | undefined>;
    const sheet: PopupSheet = {
      head: () => toValue(head()) ?? null,
      surface: () => toValue(surface()) ?? toValue(head())?.parentElement ?? null,
    };
    providePopupSheet(sheet);
    return () => slots.default?.();
  },
});
