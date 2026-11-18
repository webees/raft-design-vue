import { onMounted, ref, type Ref } from "vue";

/** The keyboard a shortcut is written for. */
export type KeyboardPlatform = "mac" | "other";

type NavigatorWithHints = Pick<Navigator, "platform"> & {
  userAgentData?: { platform?: string };
};

const APPLE = /mac|iphone|ipad|ipod/i;

let detected: KeyboardPlatform | undefined;

/**
 * Client Hints first (`userAgentData.platform`), then the deprecated
 * `navigator.platform`, which Safari and Firefox still fill in.
 */
export function detectKeyboardPlatform(nav?: NavigatorWithHints): KeyboardPlatform {
  const source =
    nav ?? (typeof window === "undefined" ? undefined : (window.navigator as NavigatorWithHints));
  if (!source) return "other";
  return APPLE.test(source.userAgentData?.platform || source.platform || "") ? "mac" : "other";
}

/**
 * The platform the page runs on, detected once on the client. The server and
 * the hydrating pass report `other`; the value settles on mount.
 */
export function useKeyboardPlatform(): Ref<KeyboardPlatform> {
  const platform = ref<KeyboardPlatform>("other");
  onMounted(() => {
    platform.value = detected ??= detectKeyboardPlatform();
  });
  return platform;
}

/** Forget the detected platform, for tests that change the navigator. */
export function resetDetectedPlatform() {
  detected = undefined;
}
