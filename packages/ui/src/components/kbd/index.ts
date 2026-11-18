export { default as Kbd } from "./Kbd.vue";
export { default as KbdGroup } from "./KbdGroup.vue";
export { default as KbdShortcut } from "./KbdShortcut.vue";
export { resolveKbdKeys } from "./kbd-keys";
export type { KbdKeyIcon, KbdKeyName, KbdResolvedKey } from "./kbd-keys";
export { useKeyboardPlatform } from "../../lib/use-platform";
export type { KeyboardPlatform } from "../../lib/use-platform";
export type KbdSize = "sm" | "md";
