import { onBeforeUnmount, watch, type Ref } from "vue";

const PRESETS = new Set(["xs", "sm", "md", "lg", "xl", "2xl"]);

export function isIconsOnlyPreset(value: string | undefined) {
  return value !== undefined && PRESETS.has(value);
}

function lengthToPx(value: string, container: Element): number | undefined {
  const match = /^(\d*\.?\d+)(px|rem|em)$/.exec(value.trim());
  if (!match) return undefined;
  const amount = Number(match[1]);
  if (match[2] === "px") return amount;
  const fontOf = match[2] === "rem" ? document.documentElement : container;
  return amount * Number.parseFloat(getComputedStyle(fontOf).fontSize);
}

function queryContainerOf(track: HTMLElement): HTMLElement | null {
  for (let el = track.parentElement; el; el = el.parentElement) {
    if (getComputedStyle(el).containerType !== "normal") return el;
  }
  return track.parentElement;
}

function contentInlineSize(el: HTMLElement): number {
  const style = getComputedStyle(el);
  return el.clientWidth - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight);
}

function labelsFit(track: HTMLElement): boolean {
  const iconsOnly = track.hasAttribute("data-icons-only");
  if (iconsOnly) track.removeAttribute("data-icons-only");
  const segments = Array.from(
    track.querySelectorAll<HTMLElement>(":scope > [data-slot=segmented-control-item]"),
  );
  let fits = true;
  if (segments.length > 0) {
    const style = getComputedStyle(track);
    const needed =
      segments[segments.length - 1]!.getBoundingClientRect().right -
      segments[0]!.getBoundingClientRect().left +
      Number.parseFloat(style.paddingLeft) +
      Number.parseFloat(style.paddingRight);
    fits = needed - track.clientWidth <= 0.5;
  }
  if (fits) {
    for (const label of Array.from(
      track.querySelectorAll<HTMLElement>("[data-slot=segmented-control-label]"),
    )) {
      if (label.scrollWidth - label.clientWidth > 1) {
        fits = false;
        break;
      }
    }
  }
  if (iconsOnly) track.setAttribute("data-icons-only", "");
  return fits;
}

/**
 * Measures a segmented control's track. `auto` collapses labels exactly when
 * the labelled segments no longer fit; a CSS length collapses when the
 * reference container is narrower. The layout decision is synchronous in the
 * observer callbacks so a resize never paints a half-collapsed frame.
 */
export function useTrackFit(
  track: Ref<HTMLElement | null>,
  iconsOnlyBelow: Ref<string | undefined>,
  overflowing: Ref<boolean>,
) {
  let cleanup: (() => void) | undefined;

  const stop = () => {
    cleanup?.();
    cleanup = undefined;
  };

  watch(
    [track, iconsOnlyBelow],
    ([element, mode]) => {
      stop();
      if (!element || typeof ResizeObserver === "undefined" || mode === undefined) {
        if (element) element.removeAttribute("data-icons-only");
        overflowing.value = false;
        return;
      }
      const measured = !isIconsOnlyPreset(mode);
      const reference = !measured
        ? null
        : mode === "auto"
          ? element.parentElement
          : queryContainerOf(element);
      if (measured && mode !== "auto" && reference && lengthToPx(mode, reference) === undefined) {
        console.warn(
          `raft-ui: SegmentedControl iconsOnlyBelow="${mode}" is not a preset, "auto" or a px, rem or em length; the segments keep their labels.`,
        );
      }

      let frame = 0;
      const measure = () => {
        frame = 0;
        overflowing.value = element.scrollWidth - element.clientWidth > 1;
      };
      const schedule = () => {
        if (frame === 0) frame = requestAnimationFrame(measure);
      };
      const fitIcons = () => {
        if (!measured) return;
        let iconsOnly = false;
        if (mode === "auto") iconsOnly = !labelsFit(element);
        else if (reference) {
          const threshold = lengthToPx(mode, reference);
          iconsOnly = threshold !== undefined && contentInlineSize(reference) < threshold;
        }
        if (iconsOnly !== element.hasAttribute("data-icons-only")) {
          element.toggleAttribute("data-icons-only", iconsOnly);
        }
      };
      const update = () => {
        fitIcons();
        schedule();
      };
      const resize = new ResizeObserver(update);
      const observeAll = () => {
        resize.disconnect();
        resize.observe(element);
        for (const child of Array.from(element.children)) resize.observe(child);
        if (reference) {
          resize.observe(reference);
          for (const child of Array.from(reference.children)) resize.observe(child);
        }
      };
      observeAll();
      const mutation = new MutationObserver(() => {
        observeAll();
        update();
      });
      mutation.observe(element, {
        childList: true,
        subtree: true,
        characterData: true,
        attributeFilter: ["data-state"],
      });
      if (reference) mutation.observe(reference, { childList: true });
      const fonts = typeof document === "undefined" ? undefined : document.fonts;
      fonts?.addEventListener("loadingdone", update);
      fitIcons();
      measure();
      cleanup = () => {
        if (frame !== 0) cancelAnimationFrame(frame);
        resize.disconnect();
        mutation.disconnect();
        fonts?.removeEventListener("loadingdone", update);
        element.removeAttribute("data-icons-only");
      };
    },
    { immediate: true },
  );

  onBeforeUnmount(stop);
}
