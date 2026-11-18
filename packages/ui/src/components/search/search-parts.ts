import { createSlotComponent } from "../../lib/create-slot-component";
import { search } from "./search.recipe";
import { searchEntity } from "./search-entity.recipe";
import { searchMessage } from "./search-message.recipe";
import { searchThread } from "./search-thread.recipe";
import { searchTrigger } from "./search-trigger.recipe";

export const SearchShellFilters = createSlotComponent({
  name: "RaftSearchShellFilters",
  tag: "div",
  dataSlot: "search-shell-filters",
  classes: (className) => search().filtersRow({ class: className }),
});

export const SearchResultsSummary = createSlotComponent({
  name: "RaftSearchResultsSummary",
  tag: "span",
  dataSlot: "search-results-summary",
  classes: (className) => search().summary({ class: className }),
});

export const SearchResultsSection = createSlotComponent({
  name: "RaftSearchResultsSection",
  tag: "div",
  dataSlot: "search-results-section",
  classes: (className) => search().section({ class: className }),
});

export const SearchResultsSectionHeading = createSlotComponent({
  name: "RaftSearchResultsSectionHeading",
  tag: "div",
  dataSlot: "search-results-section-heading",
  classes: (className) => search().sectionHeading({ class: className }),
});

export const SearchResultsList = createSlotComponent({
  name: "RaftSearchResultsList",
  tag: "div",
  dataSlot: "search-results-list",
  classes: (className) => search().list({ class: className }),
});

export const SearchTriggerLabel = createSlotComponent({
  name: "RaftSearchTriggerLabel",
  tag: "span",
  dataSlot: "search-trigger-label",
  classes: (className) => searchTrigger().label({ class: className }),
});

export const SearchEntityResult = createSlotComponent({
  name: "RaftSearchEntityResult",
  tag: "button",
  dataSlot: "search-entity-result",
  classes: (className) => searchEntity().entity({ class: className }),
  flags: { selected: ["data-selected", "true"] },
  staticAttrs: { type: "button" },
});

export const SearchEntityResultLeading = createSlotComponent({
  name: "RaftSearchEntityResultLeading",
  tag: "div",
  dataSlot: "search-entity-result-leading",
  classes: (className) => searchEntity().entityLeading({ class: className }),
});

export const SearchEntityResultIcon = createSlotComponent({
  name: "RaftSearchEntityResultIcon",
  tag: "span",
  dataSlot: "search-entity-result-icon",
  classes: (className) => searchEntity().entityIcon({ class: className }),
});

export const SearchEntityResultActivity = createSlotComponent({
  name: "RaftSearchEntityResultActivity",
  tag: "span",
  dataSlot: "search-entity-result-activity",
  classes: (className) => searchEntity().entityActivity({ class: className }),
});

export const SearchEntityResultContent = createSlotComponent({
  name: "RaftSearchEntityResultContent",
  tag: "div",
  dataSlot: "search-entity-result-content",
  classes: (className) => searchEntity().entityContent({ class: className }),
});

export const SearchEntityResultHeader = createSlotComponent({
  name: "RaftSearchEntityResultHeader",
  tag: "div",
  dataSlot: "search-entity-result-header",
  classes: (className) => searchEntity().entityHeader({ class: className }),
});

export const SearchEntityResultTitle = createSlotComponent({
  name: "RaftSearchEntityResultTitle",
  tag: "span",
  dataSlot: "search-entity-result-title",
  classes: (className) => searchEntity().entityTitle({ class: className }),
  flags: { muted: "data-muted" },
});

export const SearchEntityResultDescription = createSlotComponent({
  name: "RaftSearchEntityResultDescription",
  tag: "span",
  dataSlot: "search-entity-result-description",
  classes: (className) => searchEntity().entityDescription({ class: className }),
  flags: { muted: "data-muted" },
});

export const SearchMessageResult = createSlotComponent({
  name: "RaftSearchMessageResult",
  tag: "button",
  dataSlot: "search-message-result",
  classes: (className) => searchMessage().message({ class: className }),
  flags: { selected: ["data-selected", "true"] },
  staticAttrs: { type: "button" },
});

export const SearchThreadMessageResult = createSlotComponent({
  name: "RaftSearchThreadMessageResult",
  tag: "button",
  dataSlot: "search-message-result",
  classes: (className) => searchMessage().message({ class: className }),
  flags: { selected: ["data-selected", "true"] },
  staticAttrs: { type: "button", "data-nested": "true" },
});

export const SearchMessageResultHeader = createSlotComponent({
  name: "RaftSearchMessageResultHeader",
  tag: "div",
  dataSlot: "search-message-result-header",
  classes: (className) => searchMessage().messageHeader({ class: className }),
});

export const SearchMessageResultBody = createSlotComponent({
  name: "RaftSearchMessageResultBody",
  tag: "div",
  dataSlot: "search-message-result-body",
  classes: (className) => searchMessage().messageBody({ class: className }),
});

export const SearchMessageResultMeta = createSlotComponent({
  name: "RaftSearchMessageResultMeta",
  tag: "div",
  dataSlot: "search-message-result-meta",
  classes: (className) => searchMessage().messageMeta({ class: className }),
});

export const SearchMessageResultThreadMeta = createSlotComponent({
  name: "RaftSearchMessageResultThreadMeta",
  tag: "div",
  dataSlot: "search-message-result-thread-meta",
  classes: (className) => searchMessage().messageThreadMeta({ class: className }),
});

export const SearchMessageResultSender = createSlotComponent({
  name: "RaftSearchMessageResultSender",
  tag: "span",
  dataSlot: "search-message-result-sender",
  classes: (className) => searchMessage().messageSender({ class: className }),
});

export const SearchMessageResultTimestamp = createSlotComponent({
  name: "RaftSearchMessageResultTimestamp",
  tag: "span",
  dataSlot: "search-message-result-timestamp",
  classes: (className) => searchMessage().messageTimestamp({ class: className }),
});

export const SearchMessageResultMatch = createSlotComponent({
  name: "RaftSearchMessageResultMatch",
  tag: "mark",
  dataSlot: "search-message-result-match",
  classes: (className) => searchMessage().messageMatch({ class: className }),
});

export const SearchThreadResult = createSlotComponent({
  name: "RaftSearchThreadResult",
  tag: "div",
  dataSlot: "search-thread-result",
  classes: (className) => searchThread().thread({ class: className }),
  flags: { selected: ["data-selected", "true"] },
});

export const SearchThreadResultHeader = createSlotComponent({
  name: "RaftSearchThreadResultHeader",
  tag: "div",
  dataSlot: "search-thread-result-header",
  classes: (className) => searchThread().threadHeader({ class: className }),
});

export const SearchThreadResultMeta = createSlotComponent({
  name: "RaftSearchThreadResultMeta",
  tag: "div",
  dataSlot: "search-thread-result-meta",
  classes: (className) => searchThread().threadMeta({ class: className }),
});

export const SearchThreadResultTimestamp = createSlotComponent({
  name: "RaftSearchThreadResultTimestamp",
  tag: "span",
  dataSlot: "search-thread-result-timestamp",
  classes: (className) => searchThread().threadTimestamp({ class: className }),
});

export const SearchThreadResultTitle = createSlotComponent({
  name: "RaftSearchThreadResultTitle",
  tag: "span",
  dataSlot: "search-thread-result-title",
  classes: (className) => searchThread().threadTitle({ class: className }),
});

export const SearchThreadResultMessages = createSlotComponent({
  name: "RaftSearchThreadResultMessages",
  tag: "div",
  dataSlot: "search-thread-result-messages",
  classes: (className) => searchThread().threadMessages({ class: className }),
});
