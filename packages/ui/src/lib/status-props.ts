/**
 * The size / variant scale shared by the status light and the components that
 * host one. Kept next to the presence palette so sizes and colours can never
 * drift apart.
 */
export const STATUS_SIZE_CLASSES = {
  xs: "size-1.5 rounded-[1px] border",
  sm: "size-2",
  md: "size-2.5",
  lg: "size-[11px]",
} as const;

export const STATUS_VARIANT_COLORS = {
  default: "[--status-color:var(--presence-offline)]",
  primary: "[--status-color:var(--presence-busy)]",
  information: "[--status-color:var(--info)]",
  muted: "[--status-color:var(--palette-stone-400)]",
  accent: "[--status-color:var(--attention-400)]",
  success: "[--status-color:var(--success)]",
  warning: "[--status-color:var(--warning)]",
  danger: "[--status-color:var(--danger)]",
} as const;

export type StatusSize = keyof typeof STATUS_SIZE_CLASSES;
export type StatusVariant = keyof typeof STATUS_VARIANT_COLORS;

/** Props shared by anything that renders a status dot. */
export interface StatusStyleProps {
  size?: StatusSize;
  variant?: StatusVariant;
}
