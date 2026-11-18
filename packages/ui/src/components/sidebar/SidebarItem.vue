<script setup lang="ts">
import { computed, useAttrs } from "vue";

import { cn } from "../../lib/cn";
import type { RowTone } from "../../lib/row-tone";
import { sidebarItemRecipe } from "./sidebar-item.recipe";

defineOptions({ name: "RaftSidebarItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    active?: boolean;
    tone?: RowTone;
    wrap?: boolean;
    interactive?: boolean;
  }>(),
  { active: false, tone: undefined, wrap: false, interactive: true },
);

const attrs = useAttrs();
const classes = computed(() =>
  cn(
    sidebarItemRecipe({
      interactive: props.interactive,
      wrap: props.wrap,
    }).sidebarItem({ class: attrs.class as string | undefined }),
  ),
);
</script>

<template>
  <component
    :is="interactive ? 'button' : 'div'"
    v-bind="{ ...attrs, class: undefined }"
    :type="interactive ? 'button' : undefined"
    data-slot="sidebar-item"
    :data-active="active ? 'true' : undefined"
    :data-tone="tone"
    :data-wrap="wrap ? 'true' : undefined"
    :class="classes"
  >
    <slot />
  </component>
</template>
