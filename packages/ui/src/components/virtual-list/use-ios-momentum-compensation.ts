/*
 * iOS momentum-scroll compensation of VirtualList.
 * Ported from raft-design `components/virtual-list/hooks/use-ios-momentum-compensation.ts`.
 */
import { onBeforeUnmount, onMounted, type Ref } from "vue";

type Timer = ReturnType<typeof setTimeout>;
type FlushReason = "touchStart" | "idleTimer" | "scrollToTop" | "overBottom";

export interface IosMomentumCompensation {
  /** Adds a size change above the view; false when it was not taken (not iOS, or no touch session). */
  addCompensation: (deltaY: number) => boolean;
  /**
   * Whether scroll events are being ignored after a flush at touchstart; restores the forced
   * `scrollTop` when the browser reset it to 0.
   */
  isScrollSuppressedWithForceRestore: (scrollTop: number) => boolean;
}

/**
 * On iOS, writing `scrollTop` during momentum scrolling stops the fling. So while a touch scroll is
 * active, size changes above the view are accumulated and applied as `translateY(-compensation)` on
 * the items element; they are written to `scrollTop` (flushed) one second after the finger lifted, at
 * the top or bottom edge, or on the next touchstart.
 */
export function useIosMomentumCompensation({
  enabled,
  listElRef,
  itemsElRef,
  syncViewport,
  compensationYRef,
}: {
  enabled: boolean;
  listElRef: Ref<HTMLDivElement | null>;
  itemsElRef: Ref<HTMLDivElement | null>;
  syncViewport: () => void;
  /**
   * The offset applied through a transform instead of `scrollTop` (the range update adds it). Created by
   * the list, which reads it while rendering, before this hook runs.
   */
  compensationYRef: Ref<number>;
}): IosMomentumCompensation {
  let touchSessionActive = false;
  let idleTimer: Timer | null = null;
  let scrollSuppressTimer: Timer | null = null;
  let forcedScrollTop: number | null = null;
  let touchEnded = true;

  function applyCompensationTransform() {
    const itemsEl = itemsElRef.value;
    if (itemsEl) {
      const compensation = compensationYRef.value;
      if (compensation === 0) {
        itemsEl.style.transform = "";
      } else {
        itemsEl.style.transform = `translateY(${-compensation}px)`;
      }
    }
  }

  function clearIdleTimer() {
    if (idleTimer !== null) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  }

  function startScrollSuppression() {
    if (scrollSuppressTimer !== null) {
      clearTimeout(scrollSuppressTimer);
    }
    scrollSuppressTimer = setTimeout(() => {
      scrollSuppressTimer = null;
      forcedScrollTop = null;
      syncViewport();
    }, 200);
  }

  function flushCompensation(reason: FlushReason) {
    clearIdleTimer();
    const compensation = compensationYRef.value;
    compensationYRef.value = 0;
    touchSessionActive = false;
    applyCompensationTransform();
    const listEl = listElRef.value;
    if (listEl && compensation !== 0) {
      const scrollTop = listEl.scrollTop + compensation;
      listEl.scrollTop = scrollTop;
      if (reason === "touchStart") {
        forcedScrollTop = scrollTop;
        startScrollSuppression();
      }
    }
  }

  function scheduleIdleFlush() {
    clearIdleTimer();
    idleTimer = setTimeout(() => {
      idleTimer = null;
      if (touchEnded) {
        flushCompensation("idleTimer");
      } else {
        scheduleIdleFlush();
      }
    }, 1000);
  }

  function handleTouchStart() {
    touchEnded = false;
    if (touchSessionActive) {
      flushCompensation("touchStart");
    }
    touchSessionActive = true;
    scheduleIdleFlush();
  }

  function handleTouchEnd() {
    touchEnded = true;
  }

  function handleScrollDuringTouch() {
    if (touchSessionActive) {
      scheduleIdleFlush();
    }
  }

  function clampCompensation() {
    const listEl = listElRef.value;
    if (!listEl) {
      return;
    }
    const maxScrollTop = listEl.scrollHeight - listEl.clientHeight;
    compensationYRef.value = Math.max(
      -listEl.scrollTop,
      Math.min(maxScrollTop - listEl.scrollTop, compensationYRef.value),
    );
  }

  function addCompensation(deltaY: number): boolean {
    if (!enabled || !touchSessionActive) {
      return false;
    }
    compensationYRef.value += deltaY;
    clampCompensation();
    const listEl = listElRef.value;
    if (listEl) {
      /*
       * At the top with the finger still down the compensation waits for the lift like anywhere else,
       * but as a transform too: the range is laid out at `scrollTop + compensation`, so without it the
       * rows in view would be drawn that far below the view (an older page landing: all of it blank).
       */
      if (listEl.scrollTop <= 0 && touchEnded) {
        flushCompensation("scrollToTop");
        return true;
      }
      if (compensationYRef.value > 0) {
        const maxScrollTop = listEl.scrollHeight - listEl.clientHeight;
        if (listEl.scrollTop + compensationYRef.value >= maxScrollTop) {
          flushCompensation("overBottom");
          return true;
        }
      }
    }
    applyCompensationTransform();
    return true;
  }

  onMounted(() => {
    if (!enabled) {
      return;
    }
    const listEl = listElRef.value;
    if (!listEl) {
      return;
    }
    listEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    listEl.addEventListener("touchend", handleTouchEnd, { passive: true });
    listEl.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    listEl.addEventListener("scroll", handleScrollDuringTouch, { passive: true });
  });

  onBeforeUnmount(() => {
    const listEl = listElRef.value;
    if (listEl) {
      listEl.removeEventListener("touchstart", handleTouchStart);
      listEl.removeEventListener("touchend", handleTouchEnd);
      listEl.removeEventListener("touchcancel", handleTouchEnd);
      listEl.removeEventListener("scroll", handleScrollDuringTouch);
    }
    clearIdleTimer();
    if (scrollSuppressTimer !== null) {
      clearTimeout(scrollSuppressTimer);
      scrollSuppressTimer = null;
      forcedScrollTop = null;
    }
    if (compensationYRef.value !== 0) {
      const itemsEl = itemsElRef.value;
      if (itemsEl) {
        itemsEl.style.transform = "";
      }
      if (listEl) {
        listEl.scrollTop += compensationYRef.value;
      }
      compensationYRef.value = 0;
    }
    touchSessionActive = false;
  });

  return {
    addCompensation,
    isScrollSuppressedWithForceRestore: (scrollTop: number) => {
      const suppressed = scrollSuppressTimer !== null;
      const listEl = listElRef.value;
      if (suppressed && listEl && forcedScrollTop !== null && scrollTop === 0) {
        listEl.scrollTop = forcedScrollTop;
      }
      return suppressed;
    },
  };
}
