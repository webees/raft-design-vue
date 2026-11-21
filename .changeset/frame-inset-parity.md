---
"@webees/raft-design-vue": patch
---

`usePopupCollision` now mirrors upstream's six-argument contract
(`collisionPadding`, `collisionBoundary`, `defaultPadding`, `container`, `gap`,
`anchor`) and adds `useContentCollision` for positioner components.

Popover, PreviewCard, DropdownMenu, Tooltip, Select, ContextMenu, Combobox,
NotificationCenter and MobileNavServerPopover forward `collisionPadding`,
`collisionBoundary`, `container` and `anchor` to the Reka positioner, keep the
sheet boundary when no boundary is given, and read frame insets through
`readFrameInsets` with inherited `direction` for RTL.

`CoachMarkContent` drops the extra frame-inset wrapper and passes its
`collisionPadding` straight to `PopoverContent`, matching upstream.
