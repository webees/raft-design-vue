/** The props every Reka-backed item (tab, toggle, menu entry) accepts. */
export interface ItemProps {
  value: string | number;
  disabled?: boolean;
  as?: string;
  asChild?: boolean;
}
