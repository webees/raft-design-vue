import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The `--z-index-*` names of the upstream stylesheet, in order.
 * `design/foundations/elevation.md#layer-order`.
 */
export const Z_INDEX_NAMES = [
  "below",
  "base",
  "raised",
  "control",
  "sticky",
  "float",
  "chrome",
  "cover",
  "app",
  "scrollbar",
  "popup",
  "dialog",
  "dialog-layer",
  "lightbox",
  "toast",
  "drag",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        "control",
        "control-cta",
        "control-icon",
        "control-hit",
        "control-embedded",
        "embedded-inset",
        "option",
        "option-inset",
        "icon-inset",
        "timeline-message",
        "timeline-section",
        "timeline-row",
        "timeline-turn",
        "timeline-lead",
        "timeline-end",
        "timeline-start",
      ],
    },
    classGroups: {
      shadow: [{ shadow: ["float", "sticker", "focus"] }],
      rounded: [{ rounded: ["sticker", "chip", "control", "container", "dialog"] }],
      "font-size": [
        {
          text: [
            "field",
            "card-title",
            "hero",
            "display",
            "title",
            "headline",
            "body",
            "subhead",
            "callout",
            "footnote",
            "caption",
            "label",
            "mono-meta",
            "mono-code",
            "control",
          ],
        },
      ],
      "font-weight": [{ font: ["field", "card-title"] }],
      "mask-image": [{ "mask-fade": ["t", "t-edge", "b", "b-edge", "x"] }],
      opacity: [{ opacity: ["dimmed"] }],
      z: [{ z: [...Z_INDEX_NAMES] }],
      "bg-image": [{ overlay: ["subtle", "medium", "sticker-medium", "frame-medium"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type { ClassValue };
