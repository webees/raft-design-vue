import { recipePartFactory } from "../../lib/slot-part";
import { search } from "./search.recipe";
import { searchEntity } from "./search-entity.recipe";
import { searchMessage } from "./search-message.recipe";
import { searchThread } from "./search-thread.recipe";
import { searchTrigger } from "./search-trigger.recipe";

const shell = recipePartFactory(search);
const trigger = recipePartFactory(searchTrigger);
const entity = recipePartFactory(searchEntity);
const message = recipePartFactory(searchMessage);
const thread = recipePartFactory(searchThread);

export const SearchShellFilters = shell("SearchShellFilters", "filtersRow");
export const SearchResultsSummary = shell("SearchResultsSummary", "summary", "span");
export const SearchResultsSection = shell("SearchResultsSection", "section");
export const SearchResultsSectionHeading = shell("SearchResultsSectionHeading", "sectionHeading");
export const SearchResultsList = shell("SearchResultsList", "list");
export const SearchTriggerLabel = trigger("SearchTriggerLabel", "label", "span");

const selected = { flags: { selected: ["data-selected", "true"] } } as const;
const button = { staticAttrs: { type: "button" }, ...selected };

export const SearchEntityResult = entity("SearchEntityResult", "entity", "button", button);
export const SearchEntityResultLeading = entity("SearchEntityResultLeading", "entityLeading");
export const SearchEntityResultIcon = entity("SearchEntityResultIcon", "entityIcon", "span");
export const SearchEntityResultActivity = entity(
  "SearchEntityResultActivity",
  "entityActivity",
  "span",
);
export const SearchEntityResultContent = entity("SearchEntityResultContent", "entityContent");
export const SearchEntityResultHeader = entity("SearchEntityResultHeader", "entityHeader");
export const SearchEntityResultTitle = entity("SearchEntityResultTitle", "entityTitle", "span");
export const SearchEntityResultDescription = entity(
  "SearchEntityResultDescription",
  "entityDescription",
  "span",
);

export const SearchMessageResult = message("SearchMessageResult", "message", "button", button);
export const SearchThreadMessageResult = message("SearchThreadMessageResult", "message", "button", {
  ...button,
  dataSlot: "search-message-result",
});
export const SearchMessageResultHeader = message("SearchMessageResultHeader", "messageHeader");
export const SearchMessageResultBody = message("SearchMessageResultBody", "messageBody");
export const SearchMessageResultMeta = message("SearchMessageResultMeta", "messageMeta");
export const SearchMessageResultThreadMeta = message(
  "SearchMessageResultThreadMeta",
  "messageThreadMeta",
);
export const SearchMessageResultSender = message(
  "SearchMessageResultSender",
  "messageSender",
  "span",
);
export const SearchMessageResultTimestamp = message(
  "SearchMessageResultTimestamp",
  "messageTimestamp",
  "span",
);
export const SearchMessageResultMatch = message("SearchMessageResultMatch", "messageMatch", "mark");

export const SearchThreadResult = thread("SearchThreadResult", "thread");
export const SearchThreadResultHeader = thread("SearchThreadResultHeader", "threadHeader");
export const SearchThreadResultMeta = thread("SearchThreadResultMeta", "threadMeta");
export const SearchThreadResultTimestamp = thread(
  "SearchThreadResultTimestamp",
  "threadTimestamp",
  "span",
);
export const SearchThreadResultTitle = thread("SearchThreadResultTitle", "threadTitle", "span");
export const SearchThreadResultMessages = thread("SearchThreadResultMessages", "threadMessages");
