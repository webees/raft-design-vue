import { recipePartFactory } from "../../lib/slot-part";
import { codeBlock } from "./code-block.variants";

const part = recipePartFactory(codeBlock);

export const CodeBlock = part("CodeBlock", "root");
export const CodeBlockActions = part("CodeBlockActions", "actions");
export const CodeBlockHeader = part("CodeBlockHeader", "header");
export const CodeBlockTitle = part("CodeBlockTitle", "title");
export const CodeBlockAction = part("CodeBlockAction", "action", "button", {
  defaultType: "button",
});
