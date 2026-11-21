import { recipePart } from "../../lib/slot-part";
import { filePreview } from "./file-preview.variants";

export const FilePreview = recipePart("RaftFilePreview", "span", "file-preview", (className) =>
  filePreview().root({ className }),
);
