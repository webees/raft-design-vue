import type { InjectionKey, Ref } from "vue";

export const inboxItemDensityKey = Symbol("InboxItemDensity") as InjectionKey<
  Ref<"compact" | undefined>
>;
export const inboxItemHeadingKey = Symbol("InboxItemHeading") as InjectionKey<Ref<boolean>>;
export const inboxItemDisabledKey = Symbol("InboxItemDisabled") as InjectionKey<Ref<boolean>>;
