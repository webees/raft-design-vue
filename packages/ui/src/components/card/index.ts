import CardRoot from "./Card.vue";
import CardHeader from "./CardHeader.vue";
import CardTitle from "./CardTitle.vue";
import CardLeading from "./CardLeading.vue";
import CardDescription from "./CardDescription.vue";
import CardTrailing from "./CardTrailing.vue";
import CardContent from "./CardContent.vue";
import CardFooter from "./CardFooter.vue";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Leading: CardLeading,
  Description: CardDescription,
  Trailing: CardTrailing,
  Content: CardContent,
  Footer: CardFooter,
});

export {
  CardRoot,
  CardHeader,
  CardTitle,
  CardLeading,
  CardDescription,
  CardTrailing,
  CardContent,
  CardFooter,
};

export { cardVariants } from "./card.variants";
export type { CardVariant } from "./card.variants";
