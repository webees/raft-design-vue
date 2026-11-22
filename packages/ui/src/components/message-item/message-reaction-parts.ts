import {
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useAttrs,
} from "vue";

import TooltipContent from "../tooltip/TooltipContent.vue";
import DropdownMenuContent from "../dropdown-menu/DropdownMenuContent.vue";
import { fixedPartFactory } from "../../lib/slot-part";
import {
  messageReaction,
  reactionCountKeyframes,
  reactionCountTiming,
} from "./message-extras.recipe";

const reactionPart = fixedPartFactory(messageReaction);

export const MessageReactionGlyph = reactionPart("MessageReactionGlyph", "glyph", "span");
export const MessageReactionCount = defineComponent({
  name: "RaftMessageReactionCount",
  inheritAttrs: false,
  props: { class: { type: String, default: undefined } },
  setup(props, { slots }) {
    const attrs = useAttrs();
    const el = ref<HTMLElement | null>(null);
    let last = "";
    let animation: Animation | null = null;
    let reduced: MediaQueryList | null = null;
    const onMotion = () => {
      if (reduced?.matches) animation?.cancel();
    };
    const animate = () => {
      const value = el.value?.textContent ?? "";
      if (value === last) return;
      last = value;
      if (!/^-?\d+$/.test(value)) return;
      if (typeof el.value?.animate !== "function") return;
      if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
      reduced ??= window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduced.matches) return;
      animation?.cancel();
      animation = el.value.animate(reactionCountKeyframes, reactionCountTiming);
    };
    onMounted(async () => {
      await nextTick();
      last = el.value?.textContent ?? "";
      if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
        reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
        reduced.addEventListener("change", onMotion);
      }
    });
    onUpdated(async () => {
      await nextTick();
      animate();
    });
    onBeforeUnmount(() => {
      animation?.cancel();
      reduced?.removeEventListener("change", onMotion);
    });
    return () =>
      h(
        "span",
        {
          ...attrs,
          ref: el,
          "data-slot": "message-reaction-count",
          class: messageReaction().count({ className: props.class }),
        },
        slots.default?.(),
      );
  },
});
export const MessageReactionErrorIndicator = reactionPart(
  "MessageReactionErrorIndicator",
  "errorIndicator",
  "span",
  { rootProps: () => ({ role: "status" }) },
);
export const MessageReactionQuickRow = reactionPart("MessageReactionQuickRow", "quickRow");
export const MessageReactionPickerContent = defineComponent({
  name: "RaftMessageReactionPickerContent",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        DropdownMenuContent,
        {
          ...attrs,
          "data-slot": "message-reaction-picker",
          class: messageReaction().pickerContent({ className: attrs.class as string }),
        },
        slots,
      );
  },
});
export const MessageReactionPickerStatic = reactionPart(
  "MessageReactionPickerStatic",
  "pickerStatic",
);
export const MessageReactionTooltipContent = defineComponent({
  name: "RaftMessageReactionTooltipContent",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () =>
      h(
        TooltipContent,
        { ...attrs, class: messageReaction().tooltip({ className: attrs.class as string }) },
        slots,
      );
  },
});
export const MessageReactionTooltipNames = reactionPart(
  "MessageReactionTooltipNames",
  "tooltipNames",
  "span",
);
export const MessageReactionTooltipName = reactionPart(
  "MessageReactionTooltipName",
  "tooltipName",
  "span",
);
export const MessageReactionTooltipNameText = reactionPart(
  "MessageReactionTooltipNameText",
  "tooltipNameText",
  "span",
);
export const MessageReactionTooltipSeparator = reactionPart(
  "MessageReactionTooltipSeparator",
  "tooltipSeparator",
  "span",
);
export const MessageReactionTooltipMeta = reactionPart(
  "MessageReactionTooltipMeta",
  "tooltipMeta",
  "span",
);

export const MessageReactionChip = defineComponent({
  name: "RaftMessageReactionChip",
  inheritAttrs: false,
  props: {
    class: { type: String, default: undefined },
    pressed: { type: Boolean, default: undefined },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    "update:pressed": (_value: boolean) => true,
    "pressed-change": (_value: boolean) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const internalPressed = ref(false);
    const isPressed = computed(() => props.pressed ?? internalPressed.value);
    const classes = computed(() => messageReaction().chip({ className: props.class }));
    return () =>
      h(
        "button",
        {
          ...attrs,
          type: "button",
          "data-slot": "message-reaction-chip",
          "data-pressed": isPressed.value ? "" : undefined,
          "aria-pressed": isPressed.value,
          "aria-label": props.label,
          disabled: props.disabled,
          class: classes.value,
          onClick: (event: MouseEvent) => {
            (attrs.onClick as ((e: MouseEvent) => void) | undefined)?.(event);
            if (event.defaultPrevented) return;
            const next = !isPressed.value;
            if (props.pressed === undefined) {
              internalPressed.value = next;
            }
            emit("update:pressed", next);
            emit("pressed-change", next);
          },
        },
        slots.default?.(),
      );
  },
});

function reactionButton(name: string, dataSlot: string, slot: "addButton" | "quickButton") {
  return defineComponent({
    name,
    inheritAttrs: false,
    props: {
      class: { type: String, default: undefined },
    },
    setup(props, { attrs, slots }) {
      return () =>
        h(
          "button",
          {
            ...attrs,
            type: "button",
            "data-slot": dataSlot,
            class: messageReaction()[slot]({ className: props.class }),
          },
          slots.default?.(),
        );
    },
  });
}

export const MessageReactionAddButton = reactionButton(
  "RaftMessageReactionAddButton",
  "message-reaction-add-button",
  "addButton",
);

export const MessageReactionQuickButton = reactionButton(
  "RaftMessageReactionQuickButton",
  "message-reaction-quick-button",
  "quickButton",
);
