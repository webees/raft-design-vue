import { createSlotComponent } from "../../lib/create-slot-component";
import { recipePartFactory } from "../../lib/slot-part";
import { appRail } from "./app-rail.variants";

const part = recipePartFactory(appRail);

export const AppRailNav = part("AppRailNav", "nav", "nav");

export const AppRailItem = createSlotComponent<
  undefined,
  { selected?: boolean; disabled?: boolean; nativeButton?: boolean }
>({
  name: "RaftAppRailItem",
  tag: "button",
  dataSlot: "app-rail-item",
  asChild: true,
  props: {
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    nativeButton: { type: Boolean, default: true },
  },
  classes: (className) => appRail().item({ className }),
  rootProps: (props) => ({
    type: props.nativeButton ? "button" : undefined,
    disabled: props.nativeButton ? props.disabled : undefined,
    "aria-pressed": props.nativeButton ? props.selected : undefined,
    "data-selected": props.selected ? "true" : undefined,
    "data-disabled": props.disabled ? "true" : undefined,
  }),
});
