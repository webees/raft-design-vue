export const headEdgePull = [
  "[&>[data-icon-inset]:nth-child(1_of_:not([data-base-ui-focus-guard],[aria-owns]))]:-ml-icon-inset",
  "[&>[data-icon-inset]:nth-last-child(1_of_:not([data-base-ui-focus-guard],[aria-owns]))]:-mr-icon-inset",
];

export const headEdges = ["px-(--column-margin)", ...headEdgePull];

export const listColumnMargin =
  "[--column-margin:20px] md:pointer-fine:[--column-margin:var(--page-inset)]";

export const controlIconInset =
  "[--icon-inset:calc((var(--control-height)-var(--control-icon-size))/2)]";

export const barIconInset =
  "[--icon-inset:calc((var(--bar-button-size)-var(--control-icon-size))/2)]";

export const barButtonHit =
  "after:absolute after:-inset-[calc((var(--control-height)+2*var(--control-hit-inset)-var(--bar-button-size))/2+1.5px)]";

export const barButton = [
  "size-(--bar-button-size) rounded-(--bar-button-radius)",
  barButtonHit,
  barIconInset,
];

export const barButtonDesktop = [
  "md:pointer-fine:size-(--bar-button-size) md:pointer-fine:rounded-(--bar-button-radius)",
  "md:pointer-fine:after:-inset-[calc((var(--control-height)+2*var(--control-hit-inset)-var(--bar-button-size))/2+1.5px)]",
  "md:pointer-fine:[--icon-inset:calc((var(--bar-button-size)-var(--control-icon-size))/2)]",
];
