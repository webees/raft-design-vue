import { tv } from "../../lib/tv";

export const saveStatus = tv({
  slots: {
    root: [
      "block min-w-0 empty:hidden",
      "mt-1 [[data-slot=field]>&]:-mt-0.5 [[data-slot=list-row-body]>&]:mt-0.5",
      "text-footnote",
    ],
    error: ["block wrap-anywhere", "text-danger-strong"],
  },
});
