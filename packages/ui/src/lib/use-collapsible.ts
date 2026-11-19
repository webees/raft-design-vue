import { computed, type PropType } from "vue";

import { useControlledState } from "./use-controlled-state";

/** Props of a section that collapses through Reka's `CollapsibleRoot`. */
export const COLLAPSIBLE_SECTION_PROPS = {
  open: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  defaultOpen: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
};

/** Props of a pressed toggle, shared by the panel toggles. */
export const TOGGLE_PROPS = {
  pressed: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  defaultPressed: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  as: { type: String, default: "button" },
  asChild: { type: Boolean, default: false },
};

interface SectionProps {
  open?: boolean;
  defaultOpen: boolean;
  disabled: boolean;
}

interface ToggleProps {
  pressed?: boolean;
  defaultPressed: boolean;
  disabled: boolean;
}

/** Shared `open` state and root class of a collapsible section. */
export function useCollapsibleSection(
  props: SectionProps,
  emit: (value: boolean) => void,
  recipe: () => { root: (options?: { className?: string }) => string },
  className: string | undefined,
) {
  return {
    openState: useControlledState(
      "open",
      () => props.open,
      props.defaultOpen,
      (value) => emit(value),
    ),
    rootClass: computed(() => recipe().root({ className })),
  };
}

/** Shared pressed state and root class of a panel toggle. */
export function usePanelToggle(
  props: ToggleProps,
  emit: (value: boolean) => void,
  recipe: (options?: { className?: string }) => string,
  className: string | undefined,
) {
  return {
    current: useControlledState(
      "pressed",
      () => props.pressed,
      props.defaultPressed,
      (value) => emit(value),
    ),
    rootClass: computed(() => recipe({ className })),
  };
}
