import { tv } from "../../lib/tv";

export const kbdButton = tv({
  slots: {
    root: [
      "relative inline-flex shrink-0 items-center gap-1.5 align-middle",
      "-m-1 rounded-chip p-1",
      "cursor-pointer select-none outline-none",
      "transition-[background-color,box-shadow] duration-100",
      "after:absolute after:inset-[min(0px,calc((100%-44px)/2))]",
      "not-data-recording:hover:overlay-medium not-data-recording:hover:inset-ring not-data-recording:hover:inset-ring-line-hairline",
      "focus-visible:shadow-focus",
      "data-recording:mx-0 data-recording:my-[calc((24px-var(--control-height))/2)] data-recording:h-control",
      "data-recording:rounded-(--control-radius) data-recording:px-[calc(--spacing(2)-1.5px)] data-recording:py-0",
      "data-recording:border-[1.5px] data-recording:border-line-field data-recording:bg-layer-card",
      "data-recording:data-invalid:border-danger-strong",
      "data-invalid:**:data-[slot=kbd]:bg-danger-soft data-invalid:**:data-[slot=kbd]:text-danger-strong data-invalid:**:data-[slot=kbd]:inset-ring-danger-strong",
    ],
    placeholder: [
      "px-0.5 whitespace-nowrap",
      "font-sans text-callout text-foreground-hint",
    ],
    caret: ["block h-[18px] w-[1.5px] shrink-0 bg-foreground"],
  },
});
