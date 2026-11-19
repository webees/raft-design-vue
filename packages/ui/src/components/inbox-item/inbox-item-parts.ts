import { computed, defineComponent, h, inject, provide, useAttrs, type PropType } from "vue";

import { inboxItemDensityKey, inboxItemHeadingKey } from "./inbox-item-context";
import { inboxItemRecipe } from "./inbox-item.recipe";

type SlotName = keyof ReturnType<typeof inboxItemRecipe>;
type PartProps = { class?: string } & Record<string, unknown>;
type RecipeSlots = Record<SlotName, (options?: { class?: string }) => string>;

const slotClasses = (state: Record<string, unknown>, slot: SlotName, className?: string) =>
  (inboxItemRecipe(state as never) as RecipeSlots)[slot]({ class: className || undefined });

interface PartOptions {
  density?: boolean;
  props?: Record<string, { type: unknown; default?: unknown }>;
  /** Extra attributes computed from props and the injected heading state. */
  attrs?: (props: PartProps, heading: { value: boolean }) => Record<string, unknown>;
  /** Variant inputs derived from props, e.g. `reveal`. */
  variant?: (props: PartProps) => Record<string, unknown>;
  /** Publish whether we sit inside a compact heading. */
  provideHeading?: boolean;
  /** Consume the heading state published by an ancestor part. */
  consumeHeading?: boolean;
}

function part(
  name: string,
  tag: string,
  dataSlot: string,
  slot: SlotName,
  options: PartOptions = {},
) {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      class: { type: String, default: undefined },
      ...(options.props ?? {}),
    },
    setup(props: PartProps, { slots }) {
      const attrs = useAttrs();
      const density = options.density ? inject(inboxItemDensityKey, undefined) : undefined;
      const heading = options.provideHeading
        ? computed(() => density?.value === "compact")
        : options.consumeHeading
          ? inject(
              inboxItemHeadingKey,
              computed(() => false),
            )
          : undefined;
      if (heading && options.provideHeading) provide(inboxItemHeadingKey, heading);

      const rootClass = computed(() => {
        const className = [props.class, attrs.class as string | undefined]
          .filter(Boolean)
          .join(" ");
        return slotClasses(
          { density: density?.value, ...options.variant?.(props) },
          slot,
          className,
        );
      });

      return () => {
        const { class: _class, ...rest } = attrs;
        return h(
          tag,
          {
            ...rest,
            ...options.attrs?.(props, heading ?? { value: false }),
            "data-slot": dataSlot,
            class: rootClass.value,
          },
          slots.default?.(),
        );
      };
    },
  });
}

export const InboxItemActions = part(
  "RaftInboxItemActions",
  "div",
  "inbox-item-actions",
  "itemActions",
  {
    density: true,
    props: { reveal: { type: String as PropType<"hover" | undefined>, default: undefined } },
    variant: (props) => ({ reveal: props.reveal }),
    attrs: (props) => ({ "data-reveal": props.reveal }),
  },
);

export const InboxItemBody = part("RaftInboxItemBody", "p", "inbox-item-body", "itemBody", {
  density: true,
});

export const InboxItemContent = part(
  "RaftInboxItemContent",
  "div",
  "inbox-item-content",
  "itemContent",
  { density: true },
);

export const InboxItemContext = part(
  "RaftInboxItemContext",
  "div",
  "inbox-item-context",
  "itemContext",
);

export const InboxItemHeading = part(
  "RaftInboxItemHeading",
  "div",
  "inbox-item-heading",
  "itemHeading",
  { density: true, provideHeading: true },
);

export const InboxItemLeading = part(
  "RaftInboxItemLeading",
  "div",
  "inbox-item-leading",
  "itemLeading",
);

export const InboxItemMarks = part("RaftInboxItemMarks", "div", "inbox-item-marks", "itemMarks");

export const InboxItemMessage = part(
  "RaftInboxItemMessage",
  "p",
  "inbox-item-message",
  "itemMessage",
  { density: true },
);

export const InboxItemMetadata = part(
  "RaftInboxItemMetadata",
  "div",
  "inbox-item-metadata",
  "itemMetadata",
);

export const InboxItemSelection = part(
  "RaftInboxItemSelection",
  "div",
  "inbox-item-selection",
  "itemSelection",
);

export const InboxItemSender = part(
  "RaftInboxItemSender",
  "span",
  "inbox-item-sender",
  "itemSender",
);

export const InboxItemSubtitle = part(
  "RaftInboxItemSubtitle",
  "div",
  "inbox-item-subtitle",
  "itemSubtitle",
);

export const InboxItemTimestamp = part(
  "RaftInboxItemTimestamp",
  "span",
  "inbox-item-timestamp",
  "itemTimestamp",
  {
    density: true,
    consumeHeading: true,
    props: { reveal: { type: String as PropType<"hover" | undefined>, default: undefined } },
    variant: (props) => ({ reveal: props.reveal }),
    attrs: (_props, heading) => ({ "data-inbox-item-time": heading.value ? "" : undefined }),
  },
);

export const InboxItemTitle = part("RaftInboxItemTitle", "div", "inbox-item-title", "itemTitle", {
  density: true,
});

export const InboxItemTrailing = part(
  "RaftInboxItemTrailing",
  "div",
  "inbox-item-trailing",
  "itemTrailing",
  { density: true },
);

export const InboxItemHoverTarget = part(
  "RaftInboxItemHoverTarget",
  "span",
  "inbox-item-hover-target",
  "itemHoverTarget",
);
