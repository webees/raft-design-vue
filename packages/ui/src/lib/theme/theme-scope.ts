import { computed, type MaybeRefOrGetter, toValue } from "vue";

import { cn } from "../cn";
import { useTheme } from "./use-theme";

/**
 * Carry the provider's resolved mode (`light` / `dark`) onto content that
 * renders outside its subtree (a portal), so a dark island's popup stays dark.
 */
export function useThemeScopeClass(
  className?: MaybeRefOrGetter<string | undefined>,
): import("vue").ComputedRef<string> {
  const theme = useTheme();
  return computed(() => cn(toValue(className), theme.resolvedMode));
}
