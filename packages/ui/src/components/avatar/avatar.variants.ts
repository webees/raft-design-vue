import { tv } from "../../lib/tv";
import type { VariantProps } from "../../lib/tv";

export const avatarVariants = tv({
  slots: {
    root: [
      "group/avatar relative flex shrink-0 items-center justify-center select-none",
      "rounded-sticker border-[1.5px] border-sticker-ink",
      "text-sticker-ink shadow-[0_0_0_1.5px_var(--sticker-edge)]",
    ],
    image: ["size-full object-cover", "rounded-[2px]"],
    fallback: [
      "flex size-full items-center justify-center",
      "[&>svg]:size-4",
      "[[data-size='lg']>&]:[&>svg]:size-6",
      "[[data-size='md']>&]:[&>svg]:size-4.5",
      "[[data-size='xs']>&]:[&>svg]:size-3",
      "overflow-hidden rounded-[2px]",
      "font-sans text-[15px] leading-none font-bold tracking-[-0.01em] text-sticker-ink",
      "[[data-type='server']>&]:text-brand",
      "[[data-size='xl']>&]:text-[40px]",
      "[[data-size='lg']>&]:text-[22px]",
      "[[data-size='sm']>&]:text-[13px]",
      "[[data-size='xs']>&]:text-[11px]",
      "[[data-size='2xs']>&]:text-[11px]",
      "[[data-size='3xs']>&]:text-[8px]",
      "[[data-size='xl']>&]:[&>svg]:size-12",
      "[[data-size='sm']>&]:[&>svg]:size-3.5",
      "[[data-size='2xs']>&]:[&>svg]:size-3",
      "[[data-size='3xs']>&]:[&>svg]:size-2",
    ],
    badge: [
      "absolute z-raised select-none",
      "size-[11px] -right-1 -bottom-1 rounded-[2px]",
      "outline-2 outline-solid outline-layer-canvas",
      "group-data-[size=xl]/avatar:size-5 group-data-[size=xl]/avatar:-right-2 group-data-[size=xl]/avatar:-bottom-2",
      "group-data-[size=lg]/avatar:size-3.5 group-data-[size=lg]/avatar:right-[-5px] group-data-[size=lg]/avatar:bottom-[-5px]",
      "group-data-[size=md]/avatar:size-[11px]",
      "group-data-[size=sm]/avatar:size-[9px] group-data-[size=sm]/avatar:right-[-3px] group-data-[size=sm]/avatar:bottom-[-3px]",
      "group-data-[size=xs]/avatar:size-[7px] group-data-[size=xs]/avatar:-right-0.5 group-data-[size=xs]/avatar:-bottom-0.5",
      "group-data-[size=2xs]/avatar:size-[7px] group-data-[size=2xs]/avatar:-right-0.5 group-data-[size=2xs]/avatar:-bottom-0.5",
      "group-data-[size=3xs]/avatar:size-1.5 group-data-[size=3xs]/avatar:-right-0.5 group-data-[size=3xs]/avatar:-bottom-0.5",
    ],
    dot: [
      "inline-flex items-center justify-center outline-2",
      "[&>svg]:hidden",
      "group-data-[size=xl]/avatar:[&>svg]:size-2 group-data-[size=xl]/avatar:[&>svg]:block",
      "group-data-[size=lg]/avatar:[&>svg]:size-2 group-data-[size=lg]/avatar:[&>svg]:block",
      "group-data-[size=md]/avatar:[&>svg]:size-1.5 group-data-[size=md]/avatar:[&>svg]:block",
      "group-data-[size=xs]/avatar:outline group-data-[size=2xs]/avatar:outline group-data-[size=3xs]/avatar:outline",
      "rounded-[2px] border-[1.5px] border-sticker-ink",
      "bg-(--status-color) text-sticker-ink outline-layer-canvas",
      "group-data-[size=xl]/avatar:border-2",
      "group-data-[size=xs]/avatar:border group-data-[size=2xs]/avatar:border group-data-[size=3xs]/avatar:border",
    ],
    group: ["group/avatar-group flex items-center", "stack-x-[-5px]"],
    groupButton: [
      "relative inline-flex shrink-0 cursor-pointer items-center p-1",
      "rounded-chip border-0 bg-transparent",
      "md:pointer-fine:h-(--bar-button-size) md:pointer-fine:justify-center md:pointer-fine:rounded-(--bar-button-radius) md:pointer-fine:py-0",
      "transition-colors enabled:hover:bg-fill-medium enabled:active:bg-fill-medium",
      "outline-none focus-visible:shadow-focus",
      "disabled:cursor-default",
    ],
  },
  variants: {
    type: {
      agent: { root: ["bg-inactive"] },
      human: { root: ["bg-palette-lavender"] },
      server: { root: ["bg-sticker-ink"] },
    },
    size: {
      xl: {
        root: ["size-[99px] shadow-[0_0_0_1.5px_var(--sticker-edge),var(--elevation-sticker)]"],
      },
      lg: { root: ["size-[51px]"] },
      md: { root: ["size-[35px]"] },
      sm: { root: ["size-[27px]"] },
      xs: { root: ["size-[19px]"] },
      "2xs": { root: ["size-[19px]"] },
      "3xs": { root: "size-3.5" },
    },
  },
  defaultVariants: {
    type: "agent",
    size: "md",
  },
});

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>;
export type AvatarType = NonNullable<VariantProps<typeof avatarVariants>["type"]>;
