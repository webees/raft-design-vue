let warned = false;

export function warnMenuWithoutMoreItem() {
  if (warned) return;
  warned = true;
  console.warn(
    "raft-ui: a SelectionToolbarAction with `menu` has no `moreItem`; it would vanish when it moves into More. Give it its menu as a DropdownMenuSubmenu.",
  );
}
