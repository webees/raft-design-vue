import { X } from "lucide-vue-next";
import { h, type PropType } from "vue";

import { createSlotComponent } from "../../lib/create-slot-component";
import { buttonVariants } from "../button";
import { messageList, messageListJump } from "./message-list.recipe";

export const MessageListHistoryLimited = createSlotComponent({
  name: "RaftMessageListHistoryLimited",
  tag: "span",
  dataSlot: "message-list-history-limited",
  asChild: true,
  classes: (className) => messageList().historyLimited({ className }),
});

export const MessageListEndFade = createSlotComponent({
  name: "RaftMessageListEndFade",
  tag: "div",
  dataSlot: "message-list-end-fade",
  asChild: true,
  staticAttrs: { "aria-hidden": "true" },
  classes: (className) => messageList().endFade({ className }),
});

export const MessageListNotice = createSlotComponent<undefined, { tone?: "faint" | "muted" }>({
  name: "RaftMessageListNotice",
  tag: "div",
  dataSlot: "message-list-notice",
  asChild: true,
  props: {
    tone: { type: String as PropType<"faint" | "muted">, default: "faint" },
  },
  classes: (className, _context, props) => messageList({ tone: props.tone }).notice({ className }),
});

export const MessageListJumpControls = createSlotComponent<undefined, { side?: "top" | "bottom" }>({
  name: "RaftMessageListJumpControls",
  tag: "div",
  dataSlot: "message-list-jump-controls",
  asChild: true,
  props: {
    side: { type: String as PropType<"top" | "bottom">, default: "bottom" },
  },
  classes: (className, _context, props) =>
    messageListJump().controls({ className, side: props.side }),
  rootProps: (props) => ({ "data-side": props.side }),
});

export const MessageListJumpPillGroup = createSlotComponent({
  name: "RaftMessageListJumpPillGroup",
  tag: "div",
  dataSlot: "message-list-jump-pill-group",
  asChild: true,
  classes: (className) => messageListJump().group({ className }),
});

const pillStyles = buttonVariants({ variant: "outline", size: "md" });

export const MessageListJumpPill = createSlotComponent({
  name: "RaftMessageListJumpPill",
  tag: "button",
  dataSlot: "message-list-jump-pill",
  asChild: true,
  defaultType: "button",
  classes: (className) => pillStyles.root({ className }),
  content: {
    dataSlot: "message-list-jump-pill-content",
    classes: () => pillStyles.content(),
  },
});

const dismissStyles = buttonVariants({ variant: "outline", size: "icon-md" });

export const MessageListJumpPillDismiss = createSlotComponent({
  name: "RaftMessageListJumpPillDismiss",
  tag: "button",
  dataSlot: "message-list-jump-pill-dismiss",
  asChild: true,
  defaultType: "button",
  props: {
    ariaLabel: { type: String as PropType<string>, default: undefined },
  },
  classes: (className) =>
    dismissStyles.root({ className: messageListJump().dismiss({ className }) }),
  content: {
    dataSlot: "message-list-jump-pill-dismiss-content",
    classes: () => dismissStyles.content(),
    fallback: () => h(X),
  },
  rootProps: (props, attrs) => ({
    "aria-label": (attrs["aria-label"] as string | undefined) ?? props.ariaLabel,
  }),
});
