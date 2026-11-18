export const listCell = [
  "list-cell relative isolate bg-transparent shadow-none outline-none",
  "[--cell-inset-x:8px] [--cell-pad-x:12px] [--cell-radius:var(--radius-control)]",
  "md:pointer-fine:[--cell-pad-x:calc(var(--page-inset)-var(--cell-inset-x))]",
  "[--cell-inset-end:max(0px,calc(var(--cell-inset-x)-var(--scrollbar-size,0px)))]",
  "pr-[calc(var(--cell-inset-end)+var(--cell-pad-x))] pl-[calc(var(--cell-inset-x)+var(--cell-pad-x))]",
  "before:pointer-events-none before:absolute before:z-below before:block before:content-['']",
  "before:inset-y-0 before:right-(--cell-inset-end) before:left-(--cell-inset-x)",
  "before:rounded-(--cell-radius) before:border-0",
  "before:transition-colors before:duration-150 before:ease-out",
];

export const listCellStates = [
  "not-data-active:not-data-selected:not-data-disabled:not-disabled:not-aria-disabled:hover:before:bg-fill-cell-hover",
  "not-data-active:not-data-selected:not-data-disabled:not-disabled:not-aria-disabled:active:before:bg-fill-cell-press",
  "active:before:transition-none",
  "not-data-active:not-data-selected:data-popup-open:before:bg-fill-cell-hover",
  "not-data-active:not-data-selected:has-data-popup-open:before:bg-fill-cell-hover",
];

export const listCellFocus = [
  "focus-visible:keyboard:before:inset-ring-2 focus-visible:keyboard:before:inset-ring-foreground",
];
