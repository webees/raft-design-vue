import { createSlotPart } from "../../lib/slot-part";
import { webTopBar } from "./web-top-bar.variants";

const part = (name: string, slot: keyof ReturnType<typeof webTopBar>, dataSlot: string) =>
  createSlotPart({
    name,
    tag: "div",
    dataSlot,
    className: (className) => webTopBar()[slot]({ className }),
  });

export const WebTopBarRoot = part("RaftWebTopBarRoot", "root", "web-top-bar-root");
export const WebTopBarStart = part("RaftWebTopBarStart", "start", "web-top-bar-start");
export const WebTopBarCenter = part("RaftWebTopBarCenter", "center", "web-top-bar-center");
export const WebTopBarEnd = part("RaftWebTopBarEnd", "end", "web-top-bar-end");
