<script setup lang="ts">
import { computed, provide, useAttrs } from "vue";

import { inboxItemDensityKey, inboxItemDisabledKey } from "./inbox-item-context";
import { inboxItemRecipe } from "./inbox-item.recipe";

defineOptions({ name: "RaftInboxItem", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    density?: "default" | "compact";
    unread?: boolean;
    active?: boolean;
    disabled?: boolean;
    as?: string;
  }>(),
  { density: "default", unread: false, active: false, disabled: false, as: "article" },
);

const attrs = useAttrs();
const density = computed(() => (props.density === "compact" ? "compact" : undefined));
provide(inboxItemDensityKey, density);
provide(
  inboxItemDisabledKey,
  computed(() => props.disabled),
);
const rootClass = computed(() =>
  inboxItemRecipe({ density: density.value }).item({
    class: ["group/inbox-item", attrs.class as string | undefined].filter(Boolean).join(" "),
  }),
);
</script>

<template>
  <component
    :is="props.as"
    v-bind="{ ...attrs, class: undefined }"
    data-slot="inbox-item"
    :data-density="props.density"
    :data-unread="props.unread ? 'true' : 'false'"
    :data-active="props.active ? 'true' : undefined"
    :data-disabled="props.disabled ? '' : undefined"
    :class="rootClass"
  >
    <slot />
  </component>
</template>
