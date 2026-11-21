import { recipePart } from "../../lib/slot-part";
import { alertDialog } from "./alert-dialog.variants";

export const AlertDialogBody = recipePart(
  "RaftAlertDialogBody",
  "div",
  "alert-dialog-body",
  (className) => alertDialog().body({ className }),
);

export const AlertDialogHeader = recipePart(
  "RaftAlertDialogHeader",
  "div",
  "alert-dialog-header",
  (className) => alertDialog().header({ className }),
);
