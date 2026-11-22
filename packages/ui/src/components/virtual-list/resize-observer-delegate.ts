type ObservedResizeEntry = ResizeObserverEntry & { target: HTMLElement };
type ObservedResizeCallback = (entry: ObservedResizeEntry) => void;

class ResizeObserverDelegate {
  observer: ResizeObserver | null | undefined = undefined;
  callbacksMap = new Map<Element, ObservedResizeCallback>();
  observedDomSet = new WeakSet<Element>();
  afterEntries = new Set<() => void>();

  ensureObserver(): ResizeObserver | null {
    if (this.observer === undefined) {
      this.observer =
        typeof ResizeObserver === "undefined" ? null : new ResizeObserver(this.callback.bind(this));
    }
    return this.observer;
  }

  callback(entries: ResizeObserverEntry[]): void {
    for (const entry of entries) {
      if (!entry.target.parentElement) continue;
      this.callbacksMap.get(entry.target)?.(entry as ObservedResizeEntry);
    }
    const afterEntries = [...this.afterEntries];
    this.afterEntries.clear();
    for (const fn of afterEntries) fn();
  }

  runAfterEntries(fn: () => void): void {
    this.afterEntries.add(fn);
  }

  observe(el: HTMLElement, callback: ObservedResizeCallback): void {
    this.callbacksMap.set(el, callback);
    if (!this.observedDomSet.has(el)) {
      this.ensureObserver()?.observe(el);
      this.observedDomSet.add(el);
    }
  }

  unobserve(el: HTMLElement): void {
    this.callbacksMap.delete(el);
    if (this.observedDomSet.has(el)) {
      this.ensureObserver()?.unobserve(el);
      this.observedDomSet.delete(el);
    }
  }
}

let resizeObserverDelegate: ResizeObserverDelegate | undefined;

export function getResizeObserverDelegate(): ResizeObserverDelegate {
  resizeObserverDelegate ||= new ResizeObserverDelegate();
  return resizeObserverDelegate;
}
