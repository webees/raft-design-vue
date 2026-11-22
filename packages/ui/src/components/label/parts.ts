import { createSlotComponent } from "../../lib/create-slot-component";
import { recipePart } from "../../lib/slot-part";
import { labelVariants, type LabelSize } from "./label.variants";

export const Label = createSlotComponent<undefined, { size?: LabelSize; disabled?: boolean }>({
  name: "RaftLabel",
  tag: "label",
  dataSlot: "label",
  asChild: true,
  props: {
    size: { type: String as () => LabelSize, default: "md" },
    disabled: { type: Boolean, default: false },
  },
  classes: (className, _, props) => labelVariants({ size: props.size }).root({ className }),
  rootProps: (props) => ({
    "data-disabled": props.disabled ? "" : undefined,
    "aria-disabled": props.disabled ? "true" : undefined,
  }),
});

export const LabelSub = recipePart("RaftLabelSub", "span", "label-sub", (className) =>
  labelVariants().sub({ className }),
);
