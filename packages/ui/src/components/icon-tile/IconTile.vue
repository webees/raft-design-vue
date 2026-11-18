<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { iconTile, type IconTileSize, type IconTileVariant } from "./icon-tile.variants";

defineOptions({ name: "RaftIconTile", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    variant?: IconTileVariant;
    size?: IconTileSize;
    as?: string;
    asChild?: boolean;
  }>(),
  {
    variant: "default",
    size: "md",
    as: "span",
    asChild: false,
  },
);

const attrs = useAttrs();
const rootClass = computed(() =>
  iconTile({ variant: props.variant, size: props.size }).root({
    className: attrs.class as string,
  }),
);
const ariaHidden = computed(() => (attrs.role ? undefined : "true"));
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="icon-tile"
    :data-size="size"
    :aria-hidden="ariaHidden"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
