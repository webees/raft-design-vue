import { recipePart } from "../../lib/slot-part";
import { avatarVariants } from "./avatar.variants";

export const AvatarGroup = recipePart("RaftAvatarGroup", "div", "avatar-group", (className) =>
  avatarVariants().group({ className }),
);
