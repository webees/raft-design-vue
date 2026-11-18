import { computed, defineComponent, h, inject, provide, useAttrs, type PropType } from "vue";

import { inboxItemDensityKey, inboxItemHeadingKey } from "./inbox-item-context";
import { inboxItemRecipe } from "./inbox-item.recipe";

type SlotName = keyof ReturnType<typeof inboxItemRecipe>;

function usesDensity(slot: SlotName) {
  return ["itemContent", "itemHeading", "itemTitle", "itemTrailing", "itemBody", "itemMessage", "itemTimestamp", "itemActions"].includes(slot);
}

function part(
  name: string,
  tag: string,
  dataSlot: string,
  slot: SlotName,
  options: {
    density?: boolean;
    props?: Record<string, { type: unknown; default?: unknown }>;
  } = {},
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      class: { type: String as PropType<string>, default: undefined },
      ...(options.props ?? {}),
    },
    setup(props, { slots }) {
      const attrs = useAttrs();
      const density = options.density && usesDensity(slot) ? inject(inboxItemDensityKey, undefined) : undefined;
      const rootClass = computed(() =>
        (inboxItemRecipe({ density: density?.value }) as Record<SlotName, (options?: { class?: string }) => string>)[slot]({
          class: [props.class, attrs.class as string].filter(Boolean).join(" ") || undefined,
        }),
      );
      return () => {
        const { class: _class, ...rest } = attrs;
        return h(
          tag,
          {
            ...rest,
            "data-slot": dataSlot,
            class: rootClass.value,
          },
          slots.default?.(),
        );
      };
    },
  });
}

const InboxItemActionsBase = defineComponent({
  name: "RaftInboxItemActions",
  inheritAttrs: false,
  props: {
    class: { type: String as PropType<string>, default: undefined },
    reveal: { type: String as PropType<"hover" | undefined>, default: undefined },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const density = inject(inboxItemDensityKey, undefined);
    const rootClass = computed(() =>
      inboxItemRecipe({ density: density?.value, reveal: props.reveal }).itemActions({
        class: [props.class, attrs.class as string].filter(Boolean).join(" ") || undefined,
      }),
    );
    return () => {
      const { class: _class, ...rest } = attrs;
      return h(
        "div",
        {
          ...rest,
          "data-reveal": props.reveal,
          "data-slot": "inbox-item-actions",
          class: rootClass.value,
        },
        slots.default?.(),
      );
    };
  },
});

const InboxItemHeadingBase = defineComponent({
  name: "RaftInboxItemHeading",
  inheritAttrs: false,
  props: {
    class: { type: String as PropType<string>, default: undefined },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const density = inject(inboxItemDensityKey, undefined);
    const inHeading = computed(() => density?.value === "compact");
    provide(inboxItemHeadingKey, inHeading);
    const rootClass = computed(() =>
      inboxItemRecipe({ density: density?.value }).itemHeading({
        class: [props.class, attrs.class as string].filter(Boolean).join(" ") || undefined,
      }),
    );
    return () => {
      const { class: _class, ...rest } = attrs;
      return h(
        "div",
        {
          ...rest,
          "data-slot": "inbox-item-heading",
          class: rootClass.value,
        },
        slots.default?.(),
      );
    };
  },
});

const InboxItemTimestampBase = defineComponent({
  name: "RaftInboxItemTimestamp",
  inheritAttrs: false,
  props: {
    class: { type: String as PropType<string>, default: undefined },
    reveal: { type: String as PropType<"hover" | undefined>, default: undefined },
  },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const density = inject(inboxItemDensityKey, undefined);
    const inHeading = inject(inboxItemHeadingKey, computed(() => false));
    const rootClass = computed(() =>
      inboxItemRecipe({ density: density?.value, reveal: props.reveal }).itemTimestamp({
        class: [props.class, attrs.class as string].filter(Boolean).join(" ") || undefined,
      }),
    );
    return () => {
      const { class: _class, ...rest } = attrs;
      return h(
        "span",
        {
          ...rest,
          "data-inbox-item-time": inHeading.value ? "" : undefined,
          "data-slot": "inbox-item-timestamp",
          class: rootClass.value,
        },
        slots.default?.(),
      );
    };
  },
});

export const InboxItemActions = InboxItemActionsBase;
export const InboxItemBody = part("RaftInboxItemBody", "p", "inbox-item-body", "itemBody", { density: true });
export const InboxItemContent = part("RaftInboxItemContent", "div", "inbox-item-content", "itemContent", {
  density: true,
});
export const InboxItemContext = part("RaftInboxItemContext", "div", "inbox-item-context", "itemContext");
export const InboxItemHeading = InboxItemHeadingBase;
export const InboxItemLeading = part("RaftInboxItemLeading", "div", "inbox-item-leading", "itemLeading");
export const InboxItemMarks = part("RaftInboxItemMarks", "div", "inbox-item-marks", "itemMarks");
export const InboxItemMessage = part("RaftInboxItemMessage", "p", "inbox-item-message", "itemMessage", {
  density: true,
});
export const InboxItemMetadata = part("RaftInboxItemMetadata", "div", "inbox-item-metadata", "itemMetadata");
export const InboxItemSelection = part("RaftInboxItemSelection", "div", "inbox-item-selection", "itemSelection");
export const InboxItemSender = part("RaftInboxItemSender", "span", "inbox-item-sender", "itemSender");
export const InboxItemSubtitle = part("RaftInboxItemSubtitle", "div", "inbox-item-subtitle", "itemSubtitle");
export const InboxItemTimestamp = InboxItemTimestampBase;
export const InboxItemTitle = part("RaftInboxItemTitle", "div", "inbox-item-title", "itemTitle", {
  density: true,
});
export const InboxItemTrailing = part("RaftInboxItemTrailing", "div", "inbox-item-trailing", "itemTrailing", {
  density: true,
});
export const InboxItemHoverTarget = part(
  "RaftInboxItemHoverTarget",
  "span",
  "inbox-item-hover-target",
  "itemHoverTarget",
);
