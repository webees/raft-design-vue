import { createSlotComponent } from "../../lib/create-slot-component";
import { composerSuggestionList } from "./composer-suggestion.recipe";

export const ComposerSuggestionGroupLabel = createSlotComponent({
  name: "RaftComposerSuggestionGroupLabel",
  tag: "div",
  dataSlot: "composer-suggestion-group-label",
  classes: (className) => composerSuggestionList().groupLabel({ class: className }),
});

export const ComposerSuggestionOption = createSlotComponent({
  name: "RaftComposerSuggestionOption",
  tag: "div",
  dataSlot: "composer-suggestion-option",
  classes: (className) => composerSuggestionList().item({ class: className }),
});

export const ComposerSuggestionContent = createSlotComponent({
  name: "RaftComposerSuggestionContent",
  tag: "span",
  dataSlot: "composer-suggestion-content",
  classes: (className) => composerSuggestionList().content({ class: className }),
});

export const ComposerSuggestionTitle = createSlotComponent({
  name: "RaftComposerSuggestionTitle",
  tag: "span",
  dataSlot: "composer-suggestion-title",
  classes: (className) => composerSuggestionList().title({ class: className }),
});

export const ComposerSuggestionAside = createSlotComponent({
  name: "RaftComposerSuggestionAside",
  tag: "span",
  dataSlot: "composer-suggestion-aside",
  classes: (className) => composerSuggestionList().aside({ class: className }),
});

export const ComposerSuggestionMeta = createSlotComponent({
  name: "RaftComposerSuggestionMeta",
  tag: "span",
  dataSlot: "composer-suggestion-meta",
  classes: (className) => composerSuggestionList().meta({ class: className }),
});
