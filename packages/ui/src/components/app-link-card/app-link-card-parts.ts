import { computed, defineComponent, h, useAttrs, type PropType } from "vue";

import { messageEmbed, messageCard } from "../message-embed/message-embed.variants";
import { appLinkCard } from "./app-link-card.variants";

export function appLinkCardFrame(className: string | undefined) {
  const { root } = appLinkCard();
  return messageEmbed({ size: "item" }).root({ className: root({ className }) });
}

type Part =
  | "header"
  | "icon"
  | "name"
  | "body"
  | "eyebrow"
  | "title"
  | "meta"
  | "actions";

const tags: Record<Part, string> = {
  header: "div",
  icon: "span",
  name: "span",
  body: "div",
  eyebrow: "p",
  title: "p",
  meta: "div",
  actions: "div",
};

const slotNames: Record<Part, keyof ReturnType<typeof messageCard>> = {
  header: "source",
  icon: "sourceIcon",
  name: "sourceName",
  body: "body",
  eyebrow: "eyebrow",
  title: "title",
  meta: "meta",
  actions: "actions",
};

export function createAppLinkCardPart(part: Part) {
  return defineComponent({
    name: `RaftAppLinkCard${part.charAt(0).toUpperCase()}${part.slice(1)}`,
    inheritAttrs: false,
    setup(_, { slots }) {
      const attrs = useAttrs();
      const { class: _class, ...rest } = attrs;
      const rootClass = computed(() =>
        messageCard()[slotNames[part]]({ className: attrs.class as string }),
      );
      return () =>
        h(
          tags[part],
          {
            ...rest,
            "data-slot": `app-link-card-${part}`,
            class: rootClass.value,
          },
          slots.default?.(),
        );
    },
  });
}

export const AppLinkCard = defineComponent({
  name: "RaftAppLinkCard",
  props: {
    class: { type: String as PropType<string>, default: undefined },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const { class: _class, ...rest } = attrs;
    const rootClass = computed(() =>
      appLinkCardFrame([props.class, attrs.class as string].filter(Boolean).join(" ")),
    );
    return () =>
      h(
        "div",
        {
          ...rest,
          role: "group",
          "data-slot": "app-link-card",
          class: rootClass.value,
        },
        slots.default?.(),
      );
  },
});

export const AppLinkCardHeader = createAppLinkCardPart("header");
export const AppLinkCardIcon = createAppLinkCardPart("icon");
export const AppLinkCardName = createAppLinkCardPart("name");
export const AppLinkCardBody = createAppLinkCardPart("body");
export const AppLinkCardEyebrow = createAppLinkCardPart("eyebrow");
export const AppLinkCardTitle = createAppLinkCardPart("title");
export const AppLinkCardMeta = createAppLinkCardPart("meta");
export const AppLinkCardActions = createAppLinkCardPart("actions");
