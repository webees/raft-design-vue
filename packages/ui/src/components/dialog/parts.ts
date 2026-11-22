import { fixedPartFactory } from "../../lib/slot-part";
import { dialog } from "./dialog.variants";

export const DialogFooterNote = fixedPartFactory(dialog)("DialogFooterNote", "footerNote", "p");
