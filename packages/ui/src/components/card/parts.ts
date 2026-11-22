import { createSlotComponent } from "../../lib/create-slot-component";
import { kebabCase } from "../../lib/slot-part";
import { useCardVariant } from "./card-context";
import { cardVariants } from "./card.variants";

type CardSlot = "header" | "title" | "leading" | "description" | "trailing" | "content" | "footer";

const part = (name: string, slot: CardSlot) =>
  createSlotComponent({
    name: `Raft${name}`,
    tag: "div",
    dataSlot: kebabCase(name),
    as: false,
    context: useCardVariant,
    classes: (className, variant) => cardVariants({ variant })[slot]({ className }),
  });

export const CardHeader = part("CardHeader", "header");
export const CardTitle = part("CardTitle", "title");
export const CardLeading = part("CardLeading", "leading");
export const CardDescription = part("CardDescription", "description");
export const CardTrailing = part("CardTrailing", "trailing");
export const CardContent = part("CardContent", "content");
export const CardFooter = part("CardFooter", "footer");
