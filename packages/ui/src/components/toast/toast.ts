import { isVNode, type VNodeChild } from "vue";
import {
  createToastManager as createRekaToastManager,
  useToastManager as useRekaToastManager,
} from "reka-ui";
import type {
  GlobalToastManager,
  ToastObject as RekaToastObject,
} from "reka-ui";

export type ToastIntent = "info" | "success" | "warning" | "error";

export interface ToastData {
  intent?: ToastIntent;
  hasClose?: boolean;
  hasIcon?: boolean;
  hasProgress?: boolean;
  hasAction?: boolean;
  contentClassName?: string;
  leading?: VNodeChild;
  actionLabel?: VNodeChild;
}

export type ToastObject<Data extends object = ToastData> = RekaToastObject<Data>;

export interface ToastActionCommand {
  label: VNodeChild;
  altText?: string;
  closeOnClick?: boolean;
  onClick?: (event: MouseEvent) => void;
}

export type ToastCommandOptions<Data extends object = ToastData> = Omit<
  Partial<RekaToastObject<Data>>,
  "actionProps" | "data" | "title" | "type" | "open" | "updateKey"
> & {
  action?: ToastActionCommand;
  contentClassName?: string;
  data?: Partial<Data>;
  dismissible?: boolean;
  icon?: boolean;
  leading?: VNodeChild;
  progress?: boolean;
};

export type ToastAddOptions<Data extends object = ToastData> =
  ToastCommandOptions<Data> & {
    title: string;
    type?: ToastIntent;
  };

export const DEFAULT_TOAST_TIMEOUT_MS = 5000;
export const DEFAULT_TOAST_ACTION_TIMEOUT_MS = 8000;

const defaultManagerTiming = {
  actionTimeout: DEFAULT_TOAST_ACTION_TIMEOUT_MS,
};

export function resolveToastActionTimeout(
  timeout: number,
  actionTimeout?: number,
): number {
  if (actionTimeout !== undefined) return actionTimeout;
  return timeout > 0
    ? Math.max(timeout, DEFAULT_TOAST_ACTION_TIMEOUT_MS)
    : 0;
}

function getNodeLabel(node: VNodeChild): string | undefined {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) {
    for (const child of node) {
      const label = getNodeLabel(child);
      if (label) return label;
    }
  }
  if (isVNode(node)) {
    const children = node.children;
    if (typeof children === "string" || typeof children === "number") {
      return String(children);
    }
    if (Array.isArray(children)) return getNodeLabel(children as VNodeChild);
  }
  return undefined;
}

function toActionProps(
  action: ToastActionCommand | undefined,
  fallbackLabel: string,
): RekaToastObject<ToastData>["actionProps"] {
  if (!action) return undefined;
  const label = getNodeLabel(action.label) ?? fallbackLabel;
  return {
    label,
    altText: action.altText ?? label,
    closeOnClick: action.closeOnClick,
    onClick: action.onClick,
  };
}

function addDefaultToast(
  intent: ToastIntent,
  title: string,
  options: ToastCommandOptions = {},
): string {
  const {
    action,
    contentClassName,
    dismissible = false,
    icon = true,
    leading,
    progress = false,
    data,
    duration,
    ...toastOptions
  } = options;

  const needsActionTime = intent === "error" || Boolean(action);
  const resolvedDuration =
    duration ??
    (needsActionTime ? defaultManagerTiming.actionTimeout : undefined);

  return defaultToastManager.add({
    ...toastOptions,
    title,
    duration: resolvedDuration,
    type: intent === "error" ? "foreground" : "background",
    actionProps: toActionProps(action, title),
    data: {
      ...data,
      intent,
      hasAction: Boolean(action),
      hasClose: dismissible,
      hasIcon: icon,
      hasProgress: progress,
      contentClassName,
      leading,
      actionLabel: action?.label,
    } satisfies ToastData,
  });
}

export function createToastManager(): GlobalToastManager {
  return createRekaToastManager();
}

export const defaultToastManager: GlobalToastManager = createToastManager();

export const toast = {
  add(options: ToastAddOptions) {
    const { title, type = "info", ...toastOptions } = options;
    return addDefaultToast(type, title, toastOptions);
  },
  info(title: string, options?: ToastCommandOptions) {
    return addDefaultToast("info", title, options);
  },
  success(title: string, options?: ToastCommandOptions) {
    return addDefaultToast("success", title, options);
  },
  warning(title: string, options?: ToastCommandOptions) {
    return addDefaultToast("warning", title, options);
  },
  error(title: string, options?: ToastCommandOptions) {
    return addDefaultToast("error", title, options);
  },
  dismiss(id?: string) {
    defaultToastManager.close(id);
  },
};

export function useToastManager<Data extends object = ToastData>() {
  return useRekaToastManager<Data>();
}

export function setDefaultToastActionTimeout(value: number) {
  defaultManagerTiming.actionTimeout = value;
}

export const defaultToastManagerInstance = defaultToastManager;
