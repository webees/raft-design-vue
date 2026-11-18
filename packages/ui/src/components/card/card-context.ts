import { inject, provide, type InjectionKey } from "vue";
import { cardVariants, type CardVariant } from "./card.variants";

const CARD_VARIANT: InjectionKey<CardVariant> = Symbol("raft-card-variant");

export function provideCardVariant(variant: CardVariant) {
  provide(CARD_VARIANT, variant);
}

export function useCardVariant(): CardVariant {
  return inject(CARD_VARIANT, "default");
}

export type CardSlot =
  | "header"
  | "title"
  | "leading"
  | "description"
  | "trailing"
  | "content"
  | "footer";

export function cardSlotClass(slot: CardSlot, className?: string) {
  return cardVariants({ variant: useCardVariant() })[slot]({ className });
}
