export { default as Composer } from "./Composer.vue";
export { default as ComposerRoot } from "./ComposerRoot.vue";
export { default as ComposerInput } from "./ComposerInput.vue";
export { default as ComposerSubmit } from "./ComposerSubmit.vue";
export { default as ComposerIconButton } from "./ComposerIconButton.vue";
export { default as ComposerToolbarLabel } from "./ComposerToolbarLabel.vue";
export {
  ComposerActions,
  ComposerMeta,
  ComposerToolbar,
} from "./composer-parts";

export {
  ComposerAttachment,
  ComposerAttachmentBody,
  ComposerAttachmentFailedOverlay,
  ComposerAttachmentFile,
  ComposerAttachmentImage,
  ComposerAttachmentMeta,
  ComposerAttachments,
  ComposerAttachmentTitle,
  ComposerAttachmentUploadingOverlay,
} from "./composer-attachment-parts";
export { default as ComposerAttachmentRemove } from "./ComposerAttachmentRemove.vue";
export { default as ComposerAttachmentUploadProgressBar } from "./ComposerAttachmentUploadProgressBar.vue";
export { default as ComposerAttachmentsScrollArea } from "./ComposerAttachmentsScrollArea.vue";
export { default as SortableComposerAttachment } from "./SortableComposerAttachment.vue";
export { default as SortableComposerAttachments } from "./SortableComposerAttachments.vue";
export { default as SortableComposerAttachmentsScroll } from "./SortableComposerAttachmentsScroll.vue";

export { default as ComposerDropOverlay } from "./ComposerDropOverlay.vue";
export { default as ComposerDropOverlayPrompt } from "./ComposerDropOverlayPrompt.vue";
export {
  ComposerDropOverlayIcon,
  ComposerDropOverlayIconCluster,
  ComposerDropOverlayLabel,
} from "./composer-drop-overlay-parts";

export { default as ComposerSuggestionList } from "./ComposerSuggestionList.vue";
export { default as ComposerSuggestionIcon } from "./ComposerSuggestionIcon.vue";
export { default as ComposerSuggestionGroup } from "./ComposerSuggestionGroup.vue";
export {
  ComposerSuggestionAside,
  ComposerSuggestionContent,
  ComposerSuggestionGroupLabel,
  ComposerSuggestionMeta,
  ComposerSuggestionOption,
  ComposerSuggestionTitle,
} from "./composer-suggestion-parts";

export { composer } from "./composer.recipe";
export { composerAttachment } from "./composer-attachment.recipe";
export { composerDropOverlay } from "./composer-drop-overlay.recipe";
export { composerSuggestionList } from "./composer-suggestion.recipe";
export {
  useComposerSuggestions,
  type ComposerSuggestionsInputProps,
  type ComposerSuggestionsListProps,
  type ComposerSuggestionsOptionProps,
  type ComposerSuggestionTriggerMatch,
  type UseComposerSuggestionsParams,
} from "./use-composer-suggestions";
