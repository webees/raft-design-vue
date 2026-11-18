import type { ComputedRef, InjectionKey } from "vue";
import type { ToastObject } from "reka-ui";

import type { ToastIntent } from "./toast";
import type { ToastVariants } from "./toast.recipe";

export type ToastPlacement = NonNullable<ToastVariants["placement"]>;
export type ToastStrategy = NonNullable<ToastVariants["strategy"]>;
export type ToastLayout = NonNullable<ToastVariants["layout"]>;

export interface ToastProviderConfig {
  timeout: ComputedRef<number>;
  placement: ComputedRef<ToastPlacement>;
  strategy: ComputedRef<ToastStrategy>;
  limit: ComputedRef<number>;
}

export interface ToastItemContext {
  toast: ComputedRef<ToastObject<Record<string, unknown>>>;
  intent: ComputedRef<ToastIntent>;
}

export const TOAST_PROVIDER_CONFIG_KEY: InjectionKey<ToastProviderConfig> =
  Symbol("RaftToastProviderConfig");

export const TOAST_ITEM_CONTEXT_KEY: InjectionKey<ToastItemContext> =
  Symbol("RaftToastItemContext");

export function getSwipeDirection(placement: ToastPlacement): "up" | "down" | "left" | "right" {
  if (placement.startsWith("top")) return "up";
  if (placement === "none") return "down";
  return "down";
}
