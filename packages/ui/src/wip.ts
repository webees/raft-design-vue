/**
 * Mirrors upstream `@botiverse/raft-ui/wip`: the parts that ship while their
 * API is still settling. Everything is re-exported from the root barrel, so a
 * consumer importing this entry keeps working as parts graduate.
 */
export * from "./index";

import type { OverlayLayerProvider } from "./lib/overlay-depth";

export type InboxItemLeadingBadgeProps = InstanceType<
  typeof import("./components/inbox-item/InboxItemLeadingBadge.vue")["default"]
>["$props"];
export type InboxItemLineProps = InstanceType<
  typeof import("./components/inbox-item/parts")["InboxItemLine"]
>["$props"];
export type InboxItemListGroupProps = InstanceType<
  typeof import("./components/inbox-item/parts")["InboxItemListGroup"]
>["$props"];
export type InboxItemListHeadingProps = InstanceType<
  typeof import("./components/inbox-item/InboxItemListHeading.vue")["default"]
>["$props"];
export type InboxItemStatusProps = InstanceType<
  typeof import("./components/inbox-item/InboxItemStatus.vue")["default"]
>["$props"];
export type InboxItemSkeletonProps = InstanceType<
  typeof import("./components/inbox-item/InboxItemSkeleton.vue")["default"]
>["$props"];
export type InboxItemSkeletonListProps = InstanceType<
  typeof import("./components/inbox-item/InboxItemSkeletonList.vue")["default"]
>["$props"];
export type ListRowSkeletonProps = InstanceType<
  typeof import("./components/list-row/ListRowSkeleton.vue")["default"]
>["$props"];
export type DropdownMenuLinkItemProps = InstanceType<
  typeof import("./components/dropdown-menu/DropdownMenuLinkItem.vue")["default"]
>["$props"];
export type OverlayLayerProviderProps = InstanceType<typeof OverlayLayerProvider>["$props"];
export type PopoverActionsProps = InstanceType<
  typeof import("./components/popover/PopoverActions.vue")["default"]
>["$props"];
export type PopoverBodyProps = InstanceType<
  typeof import("./components/popover/parts")["PopoverBody"]
>["$props"];
