import CardRoot from "./Card.vue";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLeading,
  CardTitle,
  CardTrailing,
} from "./parts";

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
