import { createSlotComponent } from "./create-slot-component";

interface SlotPartOptions {
  name: string;
  tag: string;
  dataSlot: string;
  className: (className: string | undefined) => string;
  type?: "button" | "submit" | "reset";
  /** Attributes the part always renders, e.g. `aria-live` or fit registration. */
  rootProps?: () => Record<string, unknown>;
}

export function createSlotPart({ className, type, ...rest }: SlotPartOptions) {
  return createSlotComponent({
    ...rest,
    as: false,
    classes: className,
    defaultType: type,
  });
}
