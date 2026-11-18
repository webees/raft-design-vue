import { tv } from "../../lib/tv";

export const copyableCode = tv({
  slots: {
    root: ["group/copyable-code flex w-full min-w-0 items-center gap-2"],
    code: [
      "min-w-0 flex-1 font-mono",
      "rounded-control border border-line-hairline bg-layer-code",
      "text-mono-code text-foreground",
    ],
    codeInner: ["block w-full min-w-0 max-w-full break-all"],
    action: [
      "shrink-0",
      "**:data-[slot=button]:transition-[color,background-color,box-shadow]",
      "**:data-[slot=button]:duration-150 [&_[data-slot=button]]:ease-out",
    ],
    iconSwap: [
      "relative inline-grid",
      "**:data-[slot=copyable-code-icon]:col-start-1 **:data-[slot=copyable-code-icon]:row-start-1",
      "**:data-[slot=copyable-code-icon]:origin-center",
      "**:data-[slot=copyable-code-icon]:transition-[opacity,filter,scale]",
      "**:data-[slot=copyable-code-icon]:duration-170",
      "**:data-[slot=copyable-code-icon]:ease-[cubic-bezier(0.16,1,0.3,1)]",
      "**:data-[slot=copyable-code-icon]:will-change-[opacity,filter,scale]",
      "motion-reduce:**:data-[slot=copyable-code-icon]:transition-none",
      "data-[state=idle]:**:data-[icon=copy]:scale-100 data-[state=idle]:**:data-[icon=copy]:opacity-100 data-[state=idle]:[&_[data-icon=copy]]:blur-0",
      "data-[state=idle]:**:data-[icon=check]:scale-[0.72] data-[state=idle]:**:data-[icon=check]:opacity-0 data-[state=idle]:**:data-[icon=check]:blur-[1px]",
      "data-[state=copied]:**:data-[icon=check]:scale-100 data-[state=copied]:**:data-[icon=check]:opacity-100 data-[state=copied]:[&_[data-icon=check]]:blur-0",
      "data-[state=copied]:**:data-[icon=copy]:scale-[0.72] data-[state=copied]:**:data-[icon=copy]:opacity-0 data-[state=copied]:[&_[data-icon=copy]]:blur-[1px]",
      "size-4",
      "**:data-[slot=copyable-code-icon]:size-4 **:data-[slot=copyable-code-icon]:stroke-2",
    ],
  },
  variants: {
    size: {
      sm: { code: ["px-3 leading-5", "py-[5px]"] },
      md: { code: ["px-3 leading-5", "min-h-10 py-[9px]"] },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
