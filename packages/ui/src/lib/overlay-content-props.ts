/** Portal controls and focus lifecycle handlers shared by overlay content parts. */
export interface OverlayContentProps {
  portal?: boolean;
  forceMount?: boolean;
  asChild?: boolean;
  to?: string | HTMLElement;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}
