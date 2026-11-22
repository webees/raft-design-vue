import { createSlotComponent } from "../../lib/create-slot-component";
import { iconTile, type IconTileSize, type IconTileVariant } from "./icon-tile.variants";

export const IconTile = createSlotComponent<
  undefined,
  { variant?: IconTileVariant; size?: IconTileSize }
>({
  name: "RaftIconTile",
  tag: "span",
  dataSlot: "icon-tile",
  asChild: true,
  props: {
    variant: { type: String as () => IconTileVariant, default: "default" },
    size: { type: String as () => IconTileSize, default: "md" },
  },
  classes: (className, _, props) =>
    iconTile({ variant: props.variant, size: props.size }).root({ className }),
  rootProps: (props, attrs) => ({
    "data-size": props.size,
    "aria-hidden": attrs.role ? undefined : "true",
  }),
});
