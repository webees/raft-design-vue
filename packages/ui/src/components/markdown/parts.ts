import { fixedPartFactory, recipePart } from "../../lib/slot-part";
import { markdown } from "./markdown.variants";

const part = fixedPartFactory(markdown);

export const MarkdownCell = part("MarkdownCell", "cell", "td");
export const MarkdownImage = part("MarkdownImage", "image", "img");
export const MarkdownLink = part("MarkdownLink", "link", "a");
export const MarkdownList = part("MarkdownList", "list", "ul");
export const MarkdownListItem = part("MarkdownListItem", "listItem", "li");
export const MarkdownMark = part("MarkdownMark", "mark", "mark");
export const MarkdownParagraph = part("MarkdownParagraph", "paragraph", "p");
export const MarkdownRule = part("MarkdownRule", "rule", "hr");
export const MarkdownTable = part("MarkdownTable", "table", "table");
export const MarkdownTableRow = part("MarkdownTableRow", "tableRow", "tr");
export const MarkdownOrderedList = recipePart(
  "RaftMarkdownOrderedList",
  "ol",
  "markdown-list",
  (className) => markdown({ ordered: true }).list({ className }),
);
