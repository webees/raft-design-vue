import { recipePart } from "../../lib/slot-part";
import { markdown } from "./markdown.variants";

const part = (
  name: string,
  tag: string,
  dataSlot: string,
  slot: keyof ReturnType<typeof markdown>,
) =>
  recipePart(`Raft${name}`, tag, dataSlot, (className) =>
    (markdown()[slot] as (options: { className?: string }) => string)({ className }),
  );

export const MarkdownCell = part("MarkdownCell", "td", "markdown-cell", "cell");
export const MarkdownImage = part("MarkdownImage", "img", "markdown-image", "image");
export const MarkdownLink = part("MarkdownLink", "a", "markdown-link", "link");
export const MarkdownList = part("MarkdownList", "ul", "markdown-list", "list");
export const MarkdownListItem = part("MarkdownListItem", "li", "markdown-list-item", "listItem");
export const MarkdownMark = part("MarkdownMark", "mark", "markdown-mark", "mark");
export const MarkdownParagraph = part("MarkdownParagraph", "p", "markdown-paragraph", "paragraph");
export const MarkdownRule = part("MarkdownRule", "hr", "markdown-rule", "rule");
export const MarkdownTable = part("MarkdownTable", "table", "markdown-table", "table");
export const MarkdownTableRow = part("MarkdownTableRow", "tr", "markdown-table-row", "tableRow");

export const MarkdownOrderedList = recipePart(
  "RaftMarkdownOrderedList",
  "ol",
  "markdown-list",
  (className) => markdown({ ordered: true }).list({ className }),
);
