import { recipePartFactory } from "../../lib/slot-part";
import { banner } from "./banner.variants";

const part = recipePartFactory(banner);

export const BannerDescription = part("BannerDescription", "description");
export const BannerTitle = part("BannerTitle", "title");
