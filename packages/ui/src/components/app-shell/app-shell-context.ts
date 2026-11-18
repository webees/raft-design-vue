import { inject, type InjectionKey } from "vue";

export type AppShellSidebarContextValue = {
  collapsible: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  sidebarId: string | undefined;
  setSidebarId: (id: string | undefined) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
  toggle: () => void;
};

export const appShellSidebarKey: InjectionKey<AppShellSidebarContextValue> = Symbol(
  "raft-app-shell-sidebar",
);

export function useOptionalAppShellSidebar() {
  return inject(appShellSidebarKey, null);
}
