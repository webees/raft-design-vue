import {
  computed,
  defineComponent,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  watch,
  type PropType,
} from "vue";

import { installInputModality } from "../input-modality";
import {
  THEME_STATE_KEY,
  type ResolvedThemeMode,
  type ThemeMode,
  type ThemeState,
} from "./theme-context";

export interface ThemeProviderProps {
  /** Controlled colour mode. */
  mode?: ThemeMode;
  defaultMode?: ThemeMode;
  onModeChange?: (mode: ThemeMode) => void;
  /** Persist an uncontrolled mode under this localStorage key. */
  storageKey?: string;
  /**
   * Put the resolved mode on `document.documentElement` (`.light` / `.dark`
   * and `color-scheme`), and track the input modality there
   * (`data-input-modality`, see `installInputModality`), which keeps focus
   * rings to keyboard navigation. Defaults to true for the app-level provider;
   * set it to false for nested previews and islands that must not touch the
   * page root.
   */
  syncDom?: boolean;
}

function readStoredMode(storageKey: string | undefined, fallback: ThemeMode): ThemeMode {
  if (typeof window === "undefined" || !storageKey) return fallback;
  const stored = window.localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : fallback;
}

function darkQuery(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return null;
  return window.matchMedia("(prefers-color-scheme: dark)");
}

function systemMode(): ResolvedThemeMode {
  const media = darkQuery();
  if (!media) return "light";
  return media.matches ? "dark" : "light";
}

/**
 * Owns the colour mode for a raft-ui tree and publishes it to `useTheme`.
 * Renders no element of its own; put it around the app (or around an island
 * with `:sync-dom="false"`).
 */
export const ThemeProvider = defineComponent({
  name: "RaftThemeProvider",
  props: {
    mode: { type: String as PropType<ThemeMode>, default: undefined },
    defaultMode: { type: String as PropType<ThemeMode>, default: "light" },
    onModeChange: {
      type: Function as PropType<(mode: ThemeMode) => void>,
      default: undefined,
    },
    storageKey: { type: String, default: undefined },
    syncDom: { type: Boolean, default: true },
  },
  setup(props, { slots }) {
    const uncontrolled = ref<ThemeMode>(readStoredMode(props.storageKey, props.defaultMode));
    const systemDark = ref(systemMode() === "dark");
    const mode = computed<ThemeMode>(() => props.mode ?? uncontrolled.value);
    const resolvedMode = computed<ResolvedThemeMode>(() =>
      mode.value === "system" ? (systemDark.value ? "dark" : "light") : mode.value,
    );

    const setMode = (next: ThemeMode) => {
      if (props.mode === undefined) {
        uncontrolled.value = next;
        if (props.storageKey && typeof window !== "undefined") {
          try {
            window.localStorage.setItem(props.storageKey, next);
          } catch {
            // Storage can be unavailable (private mode, quota); the mode still applies.
          }
        }
      }
      props.onModeChange?.(next);
    };

    const media = darkQuery();
    if (media) {
      const onChange = () => {
        systemDark.value = media.matches;
      };
      media.addEventListener("change", onChange);
      onBeforeUnmount(() => media.removeEventListener("change", onChange));
    }

    watch(
      resolvedMode,
      (value) => {
        if (!props.syncDom || typeof document === "undefined") return;
        const root = document.documentElement;
        root.classList.toggle("dark", value === "dark");
        root.classList.toggle("light", value !== "dark");
        root.style.colorScheme = value;
      },
      { immediate: true },
    );

    let uninstall: (() => void) | undefined;
    watch(
      () => props.syncDom,
      (sync) => {
        uninstall?.();
        uninstall = sync ? installInputModality() : undefined;
      },
      { immediate: true },
    );
    onBeforeUnmount(() => uninstall?.());

    const state: ThemeState = reactive({
      get mode() {
        return mode.value;
      },
      get resolvedMode() {
        return resolvedMode.value;
      },
      setMode,
    });
    provide(THEME_STATE_KEY, state);

    return () => slots.default?.();
  },
});
