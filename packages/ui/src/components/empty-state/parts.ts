import { recipePartFactory } from "../../lib/slot-part";
import { emptyState } from "./empty-state.variants";

const part = recipePartFactory(emptyState);

export const EmptyState = part("EmptyState", "root");
export const EmptyStateActions = part("EmptyStateActions", "actions");
export const EmptyStateContent = part("EmptyStateContent", "content");
export const EmptyStateDescription = part("EmptyStateDescription", "description");
export const EmptyStateTitle = part("EmptyStateTitle", "title");
export const EmptyStateIcon = part("EmptyStateIcon", "icon", "div", {
  staticAttrs: { "aria-hidden": "true" },
});
