import { onBeforeUnmount, ref } from "vue";

const MOBILE_QUERY = "(max-width: 767px)";

function canMatchMedia() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

export function useMobileViewport() {
  const isMobile = ref(canMatchMedia() ? window.matchMedia(MOBILE_QUERY).matches : false);
  if (!canMatchMedia()) return isMobile;

  const query = window.matchMedia(MOBILE_QUERY);
  const onChange = (event: MediaQueryListEvent) => {
    isMobile.value = event.matches;
  };
  query.addEventListener("change", onChange);
  onBeforeUnmount(() => query.removeEventListener("change", onChange));
  return isMobile;
}
