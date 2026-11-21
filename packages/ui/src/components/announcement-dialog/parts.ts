import { recipePart } from "../../lib/slot-part";
import { announcement } from "./announcement-dialog.variants";

const part = (name: string, dataSlot: string, slot: "footer" | "header" | "text") =>
  recipePart(`Raft${name}`, "div", dataSlot, (className) => announcement()[slot]({ className }));

export const AnnouncementDialogFooter = part(
  "AnnouncementDialogFooter",
  "announcement-footer",
  "footer",
);
export const AnnouncementDialogHeader = part(
  "AnnouncementDialogHeader",
  "announcement-header",
  "header",
);
export const AnnouncementDialogText = part("AnnouncementDialogText", "announcement-text", "text");
