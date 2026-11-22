import { fixedPartFactory } from "../../lib/slot-part";
import { alertDialog } from "./alert-dialog.variants";

const part = fixedPartFactory(alertDialog);

export const AlertDialogBody = part("AlertDialogBody", "body");
export const AlertDialogHeader = part("AlertDialogHeader", "header");
