import type { ThemeState } from "./theme-context";
import { injectThemeState } from "./theme-context";

/** Read and update the colour mode. */
export function useTheme(): ThemeState {
  return injectThemeState();
}
