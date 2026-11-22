import { fixedPartFactory } from "../../lib/slot-part";
import { avatarVariants } from "./avatar.variants";

export const AvatarGroup = fixedPartFactory(avatarVariants)("AvatarGroup", "group");
