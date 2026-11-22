import { createSlotComponent } from "../../lib/create-slot-component";
import { inlineCode } from "./inline-code.variants";

export const InlineCode = createSlotComponent<undefined, { appearance?: "default" | "message" }>({
  name: "RaftInlineCode",
  tag: "code",
  dataSlot: "inline-code",
  asChild: true,
  props: { appearance: { type: String as () => "default" | "message" } },
  classes: (className, _, props) =>
    inlineCode({ appearance: props.appearance }).root({ className }),
});
