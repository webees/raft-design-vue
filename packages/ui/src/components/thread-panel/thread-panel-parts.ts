import { cn } from "../../lib/cn";
import { createPrimitivePart } from "../../lib/create-primitive-part";
import { kebabCase } from "../../lib/slot-part";
import { threadPanel } from "./thread-panel.variants";

type PartName = Exclude<keyof ReturnType<typeof threadPanel>, "root" | "header" | "footer">;

const part = (name: string, slot: PartName, tag = "div", staticAttrs?: Record<string, string>) =>
  createPrimitivePart(
    `RaftThreadPanel${name}`,
    `thread-panel-${kebabCase(slot)}`,
    (className) => cn(threadPanel()[slot](), className),
    tag,
    staticAttrs,
  );

export const ThreadPanelContent = part("Content", "content");
export const ThreadPanelTitle = part("Title", "title", "h2");
export const ThreadPanelTitleMeta = part("TitleMeta", "titleMeta", "span");
export const ThreadPanelActions = part("Actions", "actions", "div", {
  "data-icon-inset": "",
});
export const ThreadPanelOriginalMessage = part("OriginalMessage", "originalMessage");
export const ThreadPanelReplySummary = part("ReplySummary", "replySummary");
export const ThreadPanelReplyCount = part("ReplyCount", "replyCount");
export const ThreadPanelSearch = part("Search", "search");
export const ThreadPanelSearchTrailing = part("SearchTrailing", "searchTrailing");
export const ThreadPanelSearchCount = part("SearchCount", "searchCount");
