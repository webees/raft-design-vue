import { fixedPartFactory } from "../../lib/slot-part";
import { filePreview } from "./file-preview.variants";

export const FilePreview = fixedPartFactory(filePreview)("FilePreview", "root", "span");
