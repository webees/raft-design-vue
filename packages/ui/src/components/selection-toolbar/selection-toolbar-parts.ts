import { createSlotPart, recipePart } from "../../lib/slot-part";
import { useFitItem } from "../fit-toolbar/use-fit-item";
import { selectionToolbar } from "./selection-toolbar.recipe";

function part(
  name: string,
  tag: string,
  dataSlot: string,
  slot: keyof ReturnType<typeof selectionToolbar>,
) {
  return recipePart(name, tag, dataSlot, (className) => selectionToolbar()[slot]({ className }));
}

export const SelectionToolbarCount = createSlotPart({
  name: "RaftSelectionToolbarCount",
  tag: "span",
  dataSlot: "selection-toolbar-count",
  className: () => selectionToolbar().count(),
  rootProps: () => ({ "aria-live": "polite", "aria-atomic": "true" }),
});
export const SelectionToolbarCountValue = part(
  "RaftSelectionToolbarCountValue",
  "span",
  "selection-toolbar-count-value",
  "countValue",
);
export const SelectionToolbarHint = createSlotPart({
  name: "RaftSelectionToolbarHint",
  tag: "span",
  dataSlot: "selection-toolbar-hint",
  className: () => selectionToolbar().hint(),
  rootProps: () => {
    const item = useFitItem({ label: 10 });
    return { ...item.props.value, ref: item.ref };
  },
});
export const SelectionToolbarActions = part(
  "RaftSelectionToolbarActions",
  "div",
  "selection-toolbar-actions",
  "actions",
);
export const SelectionToolbarItem = createSlotPart({
  name: "RaftSelectionToolbarItem",
  tag: "div",
  dataSlot: "selection-toolbar-item",
  className: () => selectionToolbar().item(),
  rootProps: () => ({ "data-selection-toolbar-item": "" }),
});
export { default as SelectionToolbarMoreItems } from "../fit-toolbar/FitToolbarMoreItems.vue";
