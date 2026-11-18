import BadgeRoot from "./Badge.vue";
import BadgeExperimental from "./BadgeExperimental.vue";

export const Badge = Object.assign(BadgeRoot, { Experimental: BadgeExperimental });
export { badgeVariants } from "./badge.variants";
export type { BadgeAppearance, BadgeVariant } from "./badge.variants";
