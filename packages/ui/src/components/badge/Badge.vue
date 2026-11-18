<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Primitive } from "reka-ui";
import { badgeVariants, type BadgeAppearance, type BadgeVariant } from "./badge.variants";

defineOptions({ name: "RaftBadge", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    appearance?: BadgeAppearance;
    variant?: BadgeVariant;
    as?: string;
    asChild?: boolean;
  }>(),
  {
    appearance: "solid",
    variant: "default",
    as: "span",
    asChild: false,
  },
);

const attrs = useAttrs();
const rootClass = computed(() =>
  badgeVariants({ appearance: props.appearance, variant: props.variant }).root({
    className: attrs.class as string,
  }),
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :data-slot="(attrs['data-slot'] as string) ?? 'badge'"
    :data-appearance="appearance"
    :data-variant="variant"
    :class="rootClass"
  >
    <slot />
  </Primitive>
</template>
