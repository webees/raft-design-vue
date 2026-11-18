/**
 * The one box every chip in message text shares: a reference chip (any
 * variant, loading or unavailable too), the yellow sticker of a mention of the
 * person reading, and an inline task chip.
 *
 * - Height: derived from the line it sits on, not fixed. The body line is 22px
 *   on a desktop (body 14/22), 24px on a phone (16/24). A chip is always 2px
 *   shorter than its line, so it never makes the line taller.
 *   `--chip-line-height` overrides it for text that isn't on the body line.
 * - Alignment: the chip's text on the line's baseline; a leading mark is a
 *   floating mark centred on the chip (alignment.md, Marks in running text).
 * - Sides: 6px at each end. A chip with a leading mark (a 14px icon, an app's
 *   image or avatar in `MessageReferenceIcon`'s 14px box, the loading spinner,
 *   a task's 10px status pixel, each with 4px beside it) takes 4.5px, so the
 *   total reads 6px (alignment.md, Chips), and the mark is 4px from the text.
 *   A note after the label keeps the same 4px.
 * - Corners: `rounded-sticker`.
 */
export const inlineChip = [
  "items-baseline gap-1 px-1.5 py-0 align-baseline",
  "has-[>svg,>[data-slot=spinner],>[data-slot=message-reference-icon]]:px-[4.5px]",
  "[font-size:0.875em] leading-[var(--chip-line-height,calc(var(--text-body--line-height)-2px))] font-semibold",
  "rounded-sticker",
];
