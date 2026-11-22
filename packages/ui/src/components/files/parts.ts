import type { PropType } from "vue";

import { createSlotComponent } from "../../lib/create-slot-component";
import { files } from "./files.variants";

const filePart = (
  name: string,
  part:
    | "panel"
    | "list"
    | "row"
    | "rowOpen"
    | "thumbnail"
    | "content"
    | "name"
    | "meta"
    | "metaItem"
    | "actions",
  dataSlot: string,
  extra: { tag?: string; defaultType?: "button" } = {},
) =>
  createSlotComponent({
    name: `Raft${name}`,
    tag: extra.tag ?? "div",
    dataSlot,
    asChild: true,
    defaultType: extra.defaultType,
    classes: (className) => files()[part]({ className }),
  });

export const FilesPanel = filePart("FilesPanel", "panel", "files-panel", { tag: "section" });
export const FilesList = filePart("FilesList", "list", "files-list");
export const FileRow = filePart("FileRow", "row", "file-row");
export const FileRowOpen = filePart("FileRowOpen", "rowOpen", "file-row-open", {
  tag: "button",
  defaultType: "button",
});
export const FileThumbnail = filePart("FileThumbnail", "thumbnail", "file-thumbnail", {
  tag: "span",
});
export const FileContent = filePart("FileContent", "content", "file-content", { tag: "span" });
export const FileName = filePart("FileName", "name", "file-name", { tag: "span" });
export const FileMeta = filePart("FileMeta", "meta", "file-meta", { tag: "span" });
export const FileMetaItem = filePart("FileMetaItem", "metaItem", "file-meta-item", { tag: "span" });
export const FileActions = filePart("FileActions", "actions", "file-actions", { tag: "span" });

export const FileImage = createSlotComponent<undefined, { fit?: "contain" | "cover" }>({
  name: "RaftFileImage",
  tag: "img",
  dataSlot: "file-image",
  props: {
    fit: { type: String as PropType<"contain" | "cover">, default: "cover" },
  },
  classes: (className) => files().image({ class: className }),
  rootProps: (props) => ({ "data-fit": props.fit }),
});
