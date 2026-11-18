<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { CollapsibleRoot } from "reka-ui";

import { sidebarSectionRecipe } from "./sidebar-section.recipe";

defineOptions({ name: "RaftSidebarSection", inheritAttrs: false });

withDefaults(
  defineProps<{
    defaultOpen?: boolean;
    open?: boolean;
  }>(),
  { defaultOpen: true, open: undefined },
);

const emit = defineEmits<{ "update:open": [value: boolean] }>();
const attrs = useAttrs();
const rootClass = computed(() =>
  sidebarSectionRecipe().sidebarSection({ class: attrs.class as string | undefined }),
);
</script>

<template>
  <CollapsibleRoot
    v-bind="{ ...attrs, class: undefined }"
    data-slot="sidebar-section"
    :default-open="defaultOpen"
    :open="open"
    :class="rootClass"
    @update:open="emit('update:open', $event)"
  >
    <slot />
  </CollapsibleRoot>
</template>
