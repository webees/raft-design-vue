import { onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";

const FOCUSABLE =
  'a[href], button, input:not([type="hidden"]), select, textarea, summary, iframe, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]';

function takesTab(candidate: HTMLElement) {
  if (!candidate.isContentEditable && candidate.tabIndex < 0) {
    return false;
  }
  if (candidate.matches(":disabled") || candidate.closest("[inert]")) {
    return false;
  }
  if (typeof candidate.checkVisibility !== "function") {
    return true;
  }
  return candidate.checkVisibility({ visibilityProperty: true });
}

export function useHoldsFocusable(element: Ref<HTMLElement | null>) {
  const holds = ref(true);
  let observer: MutationObserver | undefined;

  const disconnect = () => {
    observer?.disconnect();
    observer = undefined;
  };

  const read = () => {
    const root = element.value;
    if (!root) {
      return;
    }
    holds.value = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).some(takesTab);
  };

  const observe = () => {
    disconnect();
    read();
    if (!element.value) {
      return;
    }
    observer = new MutationObserver(read);
    observer.observe(element.value, {
      attributeFilter: [
        "disabled",
        "tabindex",
        "href",
        "inert",
        "contenteditable",
        "hidden",
        "class",
        "style",
        "open",
      ],
      attributes: true,
      childList: true,
      subtree: true,
    });
  };

  onMounted(observe);
  watch(element, observe, { flush: "post" });
  onBeforeUnmount(disconnect);

  return holds;
}
