/**
 * The shared remove control inside chips: a hint-coloured glyph on a sticker
 * square that takes the medium fill on hover and press, with an inset ink ring
 * for keyboard focus.
 */
export const chipRemoveBase = [
  "inline-flex shrink-0 items-center justify-center outline-none transition-colors",
  "rounded-sticker text-foreground-hint",
  "hover:bg-fill-medium active:bg-fill-medium",
  "focus-visible:keyboard:inset-ring-2 focus-visible:keyboard:inset-ring-foreground",
  "[&>svg]:size-3.5",
];
