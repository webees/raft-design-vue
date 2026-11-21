import { recipePart } from "../../lib/slot-part";
import { dialog } from "./dialog.variants";

export const DialogFooterNote = recipePart(
  "RaftDialogFooterNote",
  "p",
  "dialog-footer-note",
  (className) => dialog().footerNote({ className }),
);
