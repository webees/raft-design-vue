import { createSlotComponent } from "../../lib/create-slot-component";
import { composerSuggestionList } from "./composer-suggestion.recipe";

export const ComposerSuggestionList = createSlotComponent({
  name: "RaftComposerSuggestionList",
  tag: "div",
  dataSlot: "composer-suggestion-list",
  classes: (className) => composerSuggestionList().root({ class: className }),
});

export const ComposerSuggestionGroup = createSlotComponent({
  name: "RaftComposerSuggestionGroup",
  tag: "div",
  dataSlot: "composer-suggestion-group",
  classes: (className) => composerSuggestionList().group({ class: className }),
});

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

export const ComposerSuggestionIcon = createSlotComponent({
  name: "RaftComposerSuggestionIcon",
  tag: "span",
  dataSlot: "composer-suggestion-icon",
  classes: (className) => composerSuggestionList().icon({ class: className }),
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
