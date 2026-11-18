<script setup lang="ts">
import type { CSSProperties } from "vue";

import { fillOnSurface, oklchToRgb, parseHexColor, type Rgb } from "../../lib/fill-contrast";
import { Badge, type BadgeVariant } from "../badge";
import { appLinkCard } from "./app-link-card.variants";

defineOptions({ name: "RaftAppLinkCardBadge", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    fill?: string;
    surface?: "card" | "popover";
    variant?: BadgeVariant;
    class?: string;
    style?: CSSProperties;
  }>(),
  {
    fill: undefined,
    surface: "card",
    variant: "default",
    class: undefined,
    style: undefined,
  },
);

const attrs = useAttrs();

const CARD_SURFACE = {
  light: oklchToRgb(1, 0, 0),
  dark: oklchToRgb(0.2596, 0.0037, 106.65),
} satisfies Record<"light" | "dark", Rgb>;

const POPOVER_SURFACE = {
  light: oklchToRgb(1, 0, 0),
  dark: oklchToRgb(0.2802, 0.0036, 106.63),
} satisfies Record<"light" | "dark", Rgb>;

const FILL_TEXT = { black: "oklch(0 0 0)", white: "oklch(1 0 0)" };

const fillVars = computed<CSSProperties | null>(() => {
  const rgb = props.fill === undefined ? null : parseHexColor(props.fill);
  if (!rgb) return null;
  const surfaces = props.surface === "popover" ? POPOVER_SURFACE : CARD_SURFACE;
  const light = fillOnSurface(rgb, surfaces.light);
  const dark = fillOnSurface(rgb, surfaces.dark);
  return {
    "--badge-fill": props.fill,
    "--badge-fill-text": FILL_TEXT[light.text],
    "--badge-ring-light": light.ring ? "var(--line-hairline)" : "transparent",
    "--badge-ring-dark": dark.ring ? "var(--line-hairline)" : "transparent",
    ...props.style,
  } as CSSProperties;
});

const mergedStyle = computed(() => (fillVars.value ? fillVars.value : props.style));
const badgeClass = computed(() =>
  fillVars.value
    ? appLinkCard().badgeFill({
        className: [props.class, attrs.class as string].filter(Boolean).join(" "),
      })
    : (attrs.class as string),
);
</script>

<template>
  <Badge
    v-bind="{ ...attrs, class: undefined, style: undefined }"
    appearance="soft"
    :variant="props.variant"
    :class="badgeClass"
    :style="mergedStyle"
  >
    <slot />
  </Badge>
</template>
