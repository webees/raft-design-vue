import { inject, provide, reactive, type InjectionKey } from "vue";

/** Colour mode. Raft is the only visual family; "system" follows the OS. */
export type ThemeMode = "light" | "dark" | "system";
export type ResolvedThemeMode = Exclude<ThemeMode, "system">;

export type ThemeState = {
  readonly mode: ThemeMode;
  readonly resolvedMode: ResolvedThemeMode;
  setMode: (mode: ThemeMode) => void;
};

export const THEME_STATE_KEY: InjectionKey<ThemeState> = Symbol("raft-theme");

/** The default when no `ThemeProvider` is above: light, and setting does nothing. */
export function createThemeState(): ThemeState {
  return reactive({
    mode: "light",
    resolvedMode: "light",
    setMode: () => undefined,
  }) as ThemeState;
}

export function provideThemeState(state: ThemeState): void {
  provide(THEME_STATE_KEY, state);
}

export function injectThemeState(): ThemeState {
  return inject(THEME_STATE_KEY, undefined) ?? createThemeState();
}
